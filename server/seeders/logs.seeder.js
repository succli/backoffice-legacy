import { Seeder } from 'mongoose-data-seed';
import Log from '../api/log/Log';
import User from '../api/user/User';
import Calendar from '../api/calendar/Calendar';
import moment from 'moment';
import _ from 'lodash';

class LogsSeeder extends Seeder {

  async beforeRun() {
    const _self = this;

    return User.aggregate([
      {
        $lookup: {
          from: 'tickets',
          localField: '_id',
          foreignField: 'user',
          as: 'tickets'
        }
      }
    ]).exec().then(users => {
      _self.users = users;

      return Calendar.find({}).exec()
    })
    .then(calendars => {
      _self.calendars = calendars;
      _self.logs = _self._generateLogs();
    });
  }

  async shouldRun() {
    return Log.count().exec().then(count => count === 0);
  }

  async run() {
    return Log.create(this.logs);
  }

  _getAllDateFromRegisteredDate (registered) {
    const dates = [];

    const currDate = registered.startOf('day');
    const lastDate = moment().startOf('day');

    while(currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone());
    }

    return dates;
  }

  _generateLogs () {
    const logs = [];

    for (let user of this.users) {
      const { tickets } = user;
      const registeredDate = moment(user.registered);
      const dates = this._getAllDateFromRegisteredDate(registeredDate);

      for (let date of dates) {
        const calendarIndex = _.findIndex(this.calendars, calendar => calendar.year === date.year());
        const dayIndex = _.findIndex(this.calendars[calendarIndex].days, day => day.number === date.dayOfYear());
        if (this.calendars[calendarIndex].days[dayIndex].isWorkday) {
          logs.push({
            start: date.clone().set({ hours: 8, minutes: 0, seconds: 0 }),
            end: date.clone().set({ hours: 8 + user.workingHours, minutes: 0, seconds: 0 }),
            user: user._id,
            ticket: null
          });
        
          for (let ticket of tickets) {
            if (ticket.name === 'Standup' && date.format('d') === 2) {
              logs.push({
                start: date.clone().set({ hours: 9, minutes: 30, seconds: 0 }),
                end: date.clone().set({ hours: 10, minutes: 0, seconds: 0 }),
                user: user._id,
                ticket: ticket._id
              });
            }
          }
        }
      }
    }

    return logs;
  }
}

export default LogsSeeder;

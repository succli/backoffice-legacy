// Load modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import classnames from 'classnames';

// Load stylesheet
import './Report.scss';

// Load components
import Title from '../Title/Title.jsx';

// Load redux actions
import { filterLogs } from '../../redux/actions/entities/log';
import { getHoursAndMinutes } from '../../services/date';

class Report extends Component {
  /**
   * @constructor
   * @param {Object} args 
   */
  constructor (...args) {
    super (...args);

    // Initial state
    this.state = {
      filter: 'worked',
      from: moment(),
      to: moment(),
      asignee: '',
      client: '',
      dates: []
    }

    // Bind functions
    this.changeSelectValue = this.changeSelectValue.bind(this);
    this.setDateRangeToToday = this.setDateRangeToToday.bind(this);
    this.setDateRangeToMonth = this.setDateRangeToMonth.bind(this);
    this.changeFromDate = this.changeFromDate.bind(this);
    this.changeToDate = this.changeToDate.bind(this);
    this.filter = this.filter.bind(this);
  }

  /**
   * Set date range between two dates
   */
  setDateRange () {
    const dates = [];

    const startDate = this.state.from.clone();
    const endDate = this.state.to.clone();

    dates.push(startDate.clone());

    while (startDate.add(1, 'day').diff(endDate) < 0) {
      dates.push(startDate.clone());
    }

    this.setState({
      dates
    });
  }

  /**
   * Changes from date state
   * @param {Object} date 
   */
  changeFromDate (date) {
    this.setState({
      from: date
    });
  }

  /**
   * Changes to date state
   * @param {Object} date 
   */
  changeToDate (date) {
    this.setState({
      to: date
    });
  }

  /**
   * Changes select's value
   * @param {Event} event 
   */
  changeSelectValue (event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Set date range state to current month
   */
  setDateRangeToMonth () {
    this.setState({
      from: moment().startOf('month'),
      to: moment()
    });
  }

  /**
   * Set date range state to today
   */
  setDateRangeToToday () {
    this.setState({
      from: moment(),
      to: moment()
    });
  }

  /**
   * Dispatches log filtering action
   */
  filter () {
    this.props.dispatch(filterLogs(this.state));
    this.setDateRange();
  }

  /**
   * Calculates dates log summary
   * @param {Number} dateIndex 
   * @param {Object[]} logs 
   * @returns {String}
   */
  getLoggedHour (dateIndex, logs) {
    const activeLogs = _.filter(logs, log => {
      return moment(log.start).format('YYYY-MM-DD') === this.state.dates[dateIndex].format('YYYY-MM-DD');
    });
    const dataTime = { hours: 0, minutes: 0 }

    if (activeLogs) {
      _.forEach(activeLogs, log => {
        const data = getHoursAndMinutes(log);
        dataTime.hours += data.hours;
        dataTime.minutes += data.minutes
      });

      let extraHours;

      if (dataTime.minutes > 60) {
        extraHours = Math.floor(dataTime.minutes / 60);
        dataTime.hours += extraHours;
        dataTime.minutes -= extraHours * 60;
      }

      return moment(dataTime).format('HH:mm');
    } else {
      return '00:00';
    }
  }

  /**
   * Calculates all log summary
   * @returns {String}
   */
  renderAllLogged () {
    const { filtered } = this.props;
    const dataTime = { hours: 0, minutes: 0 };

    if (filtered) {
      _.forEach(filtered, log => {
        const data = getHoursAndMinutes(log);
        dataTime.hours += data.hours;
        dataTime.minutes += data.minutes
      });

      let extraHours;

      if (dataTime.minutes > 60) {
        extraHours = Math.floor(dataTime.minutes / 60);
        dataTime.hours += extraHours;
        dataTime.minutes -= extraHours * 60;
      }

      dataTime.hours = dataTime.hours < 10 ? `0${dataTime.hours}` : dataTime.hours;
      dataTime.minutes = dataTime.minutes < 10 ? `0${dataTime.minutes}` : dataTime.minutes;

      return `${dataTime.hours}:${dataTime.minutes}`;
    } else {
      return '00:00';
    }
  }

  /**
   * Get date classname by date
   * @param {Number} dateIndex 
   * @returns {String}
   */
  getDateClassName (dateIndex) {
    const { calendars } = this.props;
    const date = this.state.dates[dateIndex];

    const calendar = calendars[_.findIndex(calendars, calendar => calendar.year === date.year())];
    const day = calendar.days[_.findIndex(calendar.days, day => day.number === date.dayOfYear())];

    if (day.isWorkday) {
      return 'log-row-weekday';
    } else {
      if (day.note.length) {
        return 'log-row-holiday';
      } else {
        return 'log-row-weekend';
      }
    }
  }

  /**
   * Render component
   */
  render () {
    const { users, isAdmin, currentUser, clients, filtered } = this.props;

    return (
      <div>
        <Title title="Report" />
        <section className="content">
          <div className="row">
            <div className="col-12">
              <div className="content-card">
                <div className="report-filters">
                  <div className="row">
                    <div className="col-6">

                      <div className="row form-group align-items-center">
                        <label htmlFor="filter" className="col-2 col-lg-3">Filter</label>
                        <div className="col-10 col-lg-9">
                          <select name="filter" id="filter" className="form-control" value={this.state.filter} onChange={this.changeSelectValue}>
                            <option value="worked">Worked hours</option>
                            <option value="logged">Logged hours</option>
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-5">
                          <div className="row form-group align-items-center">
                            <label htmlFor="from" className="col-2 col-lg-3">from</label>
                            <div className="col-10 col-lg-9">
                              <DatePicker locale="en" name="from" id="from" dateFormat="YYYY. MM. DD." selected={this.state.from} onChange={this.changeFromDate} className="form-control" />
                            </div>
                          </div>
                        </div>
                        <div className="col-5">
                          <div className="row form-group align-items-center">
                            <label htmlFor="to" className="col-2 col-lg-3">to</label>
                            <div className="col-10 col-lg-9">
                              <DatePicker locale="en" name="to" id="to" dateFormat="YYYY. MM. DD." selected={this.state.to} onChange={this.changeToDate}  className="form-control" />
                            </div>
                          </div>
                        </div>
                        <div className="col-2">
                          <button type="button" className="filter-action-button" title="Today" onClick={this.setDateRangeToToday}><i className="fa fa-sun-o"></i></button>
                          <button type="button" className="filter-action-button" title="This month" onClick={this.setDateRangeToMonth}><i className="fa fa-calendar"></i></button>
                        </div>
                      </div>

                    </div>
                    <div className="col-6">

                      <div className="row form-group align-items-center">
                        <label htmlFor="asignee" className="col-2 col-lg-3">Asignee</label>
                        <div className="col-10 col-lg-9">
                          <select name="asignee" id="asignee" className="form-control" value={this.state.asignee} onChange={this.changeSelectValue}>
                            <option value=""></option>
                            {(users && isAdmin) ? users.map(user => (
                              <option key={user._id} value={user._id}>{`${user.firstname} ${user.lastname}`}</option>
                            )) : (currentUser && <option value={currentUser._id}>{`${currentUser.firstname} ${currentUser.lastname}`}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="row form-group align-items-center">
                        <label htmlFor="client" className="col-2 col-lg-3">Client</label>
                        <div className="col-10 col-lg-9">
                          <select name="client" id="client" className="form-control" disabled={this.state.filter === 'worked'} value={this.state.client} onChange={this.changeSelectValue}>
                            <option value=""></option>
                            {clients && clients.map(client => (
                              <option key={client._id} value={client._id}>{client.company}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 text-right">
                      <button type="button" className="btn btn-primary" onClick={this.filter}>Filter</button>
                    </div>
                  </div>
                </div>

                {filtered.length > 0 && this.state.dates.length > 0 && (
                  <div className="log-table">
                    {this.state.dates.map((date, i) => {

                      return (
                        <div className={classnames('log-row', this.getDateClassName(i))} key={i}>
                          <div className="row">
                            <div className="col-6">{date.clone().format('YYYY. MM. DD.')}</div>
                            <div className="col-3">{date.clone().format('dddd')}</div>
                            <div className="col-3 text-right">{this.getLoggedHour(i, filtered)}</div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="log-row log-row-result">
                      <div className="row justify-content-end">
                        <div className="col-12 text-right"><strong>{this.renderAllLogged()}</strong></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

// Connect component with Redux
export default connect(state => ({
  users: state.entities.user.all,
  isAdmin: state.entities.auth.admin,
  currentUser: state.entities.user.all[_.findIndex(state.entities.user.all, user => user._id === state.entities.auth.current)],
  clients: state.entities.client.all,
  filtered: state.entities.log.filtered,
  calendars: state.entities.calendar.all
}))(Report);
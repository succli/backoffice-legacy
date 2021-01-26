import { Seeder } from 'mongoose-data-seed';
import User from '../api/user/User';

const data = [
  {
    firstname: 'Zsolt',
    lastname: 'Schutzbach',
    email: 'schutzbach.zsolt@e-vista.hu',
    password: 'navista123',
    avatar: 'http://localhost:32781/images/j1xv2lHTq5a6WQeYS2VzPSM6Z02Lqeva.jpeg',
    position: 'Frontend Developer',
    privateEmail: 'schutzbach.zsolt@gmail.com',
    phone: '+36706300240',
    workingHours: 8,
    group: 'Developer',
    role: 'Administrator',
    registered: new Date('2018-01-01 00:00:00')
  },
  {
    firstname: 'Mihály',
    lastname: 'Molnár',
    email: 'molnar.mihaly@e-vista.hu',
    password: 'navista123',
    avatar: 'http://localhost:32781/images/JJcstziyhKhQ8hqETDmy.jpg',
    position: 'Art Director',
    privateEmail: 'molnar.mihaly@gmail.com',
    phone: '+3655337635',
    workingHours: 8,
    group: 'Design',
    registered: new Date('2018-01-01 00:00:00')
  }, {
    firstname: 'Bálint',
    lastname: 'Vincze',
    email: 'vincze.balint@e-vista.hu',
    password: 'navista123',
    avatar: 'http://localhost:32781/images/QQybi4qED1JGSbZwLZb4bvCv2CDRa2YE.jpeg',
    position: 'Project Manager',
    privateEmail: 'vincze.balint@gmail.com',
    phone: '+3655648113',
    workingHours: 8,
    group: 'Management',
    registered: new Date('2018-01-01 00:00:00')
  }, {
    firstname: 'Éva',
    lastname: 'Terhes',
    email: 'terhes.eva@e-vista.hu',
    password: 'navista123',
    avatar: 'http://localhost:32781/images/hzG3OmYfkY0f6GGHl6wg.jpg',
    position: 'Junior Project Manager',
    privateEmail: 'terhes.eva@gmail.com',
    phone: '+3655354446',
    workingHours: 4,
    group: 'Management',
    registered: new Date('2018-01-01 00:00:00')
  }, {
    firstname: 'Bálint',
    lastname: 'Séra',
    email: 'sera.balint@e-vista.hu',
    password: 'navista123',
    avatar: 'http://localhost:32781/images/FgRMvxlNuhSLzBsmmdll.jpg',
    position: 'Head of Technology',
    privateEmail: 'sera.balint@gmail.com',
    phone: '+3655613815',
    workingHours: 8,
    group: 'Developer',
    registered: new Date('2018-01-01 00:00:00')
  }, {
    firstname: 'Norbert',
    lastname: 'Durst',
    email: 'durst.norbert@e-vista.hu',
    password: 'navista123',
    avatar: 'http://localhost:32781/images/iTbRP0USxY3RQwEqRT07.jpg',
    position: 'Senior Designer',
    privateEmail: 'durst.norbert@gmail.com',
    phone: '+3655217075',
    workingHours: 8,
    group: 'Design',
    registered: new Date('2018-01-01 00:00:00')
  }, {
    firstname: 'József',
    lastname: 'Mikus',
    email: 'mikus.jozsef@e-vista.hu',
    password: 'navista123',
    avatar: 'http://localhost:32781/images/CDuCoPg5mt7bJ51yXgeX.jpg',
    position: 'Frontend Developer',
    privateEmail: 'mikus.jozsef@gmail.com',
    phone: '+3655967057',
    workingHours: 4,
    group: 'Developer',
    registered: new Date('2018-01-01 00:00:00')
  }
];

class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.count().exec().then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;

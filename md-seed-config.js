import mongooseLib from 'mongoose';

mongooseLib.Promise = global.Promise;

import Users from './server/seeders/users.seeder';
import Clients from './server/seeders/clients.seeder';
import Tickets from './server/seeders/tickets.seeder';
import Logs from './server/seeders/logs.seeder';

// Export the mongoose lib
export const mongoose = mongooseLib;

// Export the mongodb url
export const mongoURL = process.env.DATABASE || 'mongodb://localhost:27017/dbname';

/*
  Seeders List
  ------
  order is important
*/
export const seedersList = {
  Users,
  Clients,
  Tickets,
  Logs
};

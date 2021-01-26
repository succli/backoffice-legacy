import { Seeder } from 'mongoose-data-seed';
import Ticket from '../api/ticket/Ticket';
import User from '../api/user/User';
import Client from '../api/client/Client';
import _ from 'lodash';

class TicketsSeeder extends Seeder {
  async beforeRun () {
    const _self = this;

    return User.find({})
      .exec()
      .then(users => {
        _self.users = users;

        return Client.find({}).exec()
      })
      .then(clients => {
        _self.clients = clients;
        _self.ticketData = _self._generateTickets();
      });
  }

  async shouldRun() {
    return Ticket.count().exec().then(count => count === 0);
  }

  async run() {
    return Ticket.create(this.ticketData);
  }

  _generateTickets () {
    const data = [];

    for (let user of this.users) {
      data.push({
        name: 'Project kick off',
        startdate: new Date('2018-01-01 00:00:00'),
        duedate: new Date('2020-12-31 00:00:00'),
        priority: 0,
        description: 'Before every project starts we will make a kick off meeting',
        type: 'default',
        estimated: 1000,
        user: user._id,
        client: this.clients[_.findIndex(this.clients, client => client.company === 'Evista Ltd')]
      });

      data.push({
        name: 'Standup',
        startdate: new Date('2018-01-01 00:00:00'),
        duedate: new Date('2020-12-31 00:00:00'),
        priority: 0,
        description: 'Weekly standup meeting every Thuesday',
        type: 'default',
        estimated: 1000,
        user: user._id,
        client: this.clients[_.findIndex(this.clients, client => client.company === 'Evista Ltd')]
      });

      if (user.email === 'schutzbach.zsolt@e-vista.hu') {
        data.push({
          name: 'Help és Developers fórumok - reCAPTCHA beépítése',
          startdate: new Date('2018-01-01 00:00:00'),
          duedate: new Date('2018-01-19 00:00:00'),
          priority: 1,
          description: 'A Help és Developers oldalakon lévő komment modulhoz kérlek építsd be a Google reCAPTCHA modult, ezzel is csökkentve a spam-ek érkezését (amiből most hetente 1-2 jön legalább).',
          type: 'development',
          estimated: 1000,
          hyperlink: 'http://redmine.dev.e-vista.hu/issues/3907',
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'VCC Live')]
        });

        data.push({
          name: 'Új telesales oldal (sitebuild)',
          startdate: new Date('2018-01-28 00:00:00'),
          duedate: new Date('2018-02-23 00:00:00'),
          priority: 1,
          description: 'A Help és Developers oldalakon lévő komment modulhoz kérlek építsd be a Google reCAPTCHA modult, ezzel is csökkentve a spam-ek érkezését (amiből most hetente 1-2 jön legalább).',
          type: 'development',
          estimated: 30,
          hyperlink: 'http://redmine.dev.e-vista.hu/issues/3951',
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'VCC Live')]
        });

        data.push({
          name: 'MD importer továbbfejlesztése',
          startdate: new Date('2018-01-01 00:00:00'),
          duedate: new Date('2018-01-31 00:00:00'),
          priority: 0,
          description: 'A #3850 -es ticket szerint kérlek készítsd el staging-re az új Telesales oldalt',
          type: 'development',
          estimated: 30,
          hyperlink: 'http://redmine.dev.e-vista.hu/issues/3909',
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'VCC Live')]
        });

        data.push({
          name: 'Pipedrive / Zapier - Subsource beállítása',
          startdate: new Date('2018-02-09 00:00:00'),
          duedate: new Date('2018-02-28 00:00:00'),
          priority: 1,
          description: 'Szeretnénk a Pipedrive CRM-rendszerében beazonosítani azt, hogy pontosan honnan jönnek a lead-ek, milyen forgalmi forrásból',
          type: 'development',
          estimated: 8,
          hyperlink: 'http://redmine.dev.e-vista.hu/issues/3975',
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'VCC Live')]
        });

        data.push({
          name: 'LinkedIn és organikus subsource beállítása',
          startdate: new Date('2018-03-08 00:00:00'),
          duedate: new Date('2018-03-10 00:00:00'),
          priority: 3,
          description: 'Kérlek, állítsd be a korábbi "google_search" mintájára, hogy az url-ben lévő "linkedin" szó megléte esetén a Pipedrive-ban a subsource értéke legyen LinkedIn.',
          type: 'development',
          estimated: 16,
          hyperlink: 'http://redmine.dev.e-vista.hu/issues/4054',
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'VCC Live')]
        });

        data.push({
          name: 'Software update log widget sitebuild',
          startdate: new Date('2018-03-14 00:00:00'),
          duedate: new Date('2018-03-23 00:00:00'),
          priority: 1,
          description: 'Kérlek, a #4017 -es ticketben lévő "v3" verzió szerint készítsd el a Download oldalra a software update log widgetet.',
          type: 'development',
          estimated: 8,
          hyperlink: 'http://redmine.dev.e-vista.hu/issues/4071',
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'VCC Live')]
        });

        data.push({
          name: '4 új microsite sitebuild (Voice, Email, SMS, Chat)',
          startdate: new Date('2018-04-12 00:00:00'),
          duedate: new Date('2018-04-20 00:00:00'),
          priority: 1,
          description: 'Kérlek, a #4063 -as ticket szerint építsd fel a négy új landing oldalt (/voice, /email, /sms, /chat).',
          type: 'development',
          estimated: 4,
          hyperlink: 'http://redmine.dev.e-vista.hu/issues/4130',
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'VCC Live')]
        });

        data.push({
          name: 'Menutech - Key target page',
          startdate: new Date('2018-02-22 00:00:00'),
          duedate: new Date('2018-04-05 00:00:00'),
          priority: 2,
          description: '',
          type: 'development',
          estimated: 30,
          hyperlink: 'https://igeltech.atlassian.net/projects/MT/issues/MT-11 ',
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'igel.tech')]
        });

        data.push({
          name: 'Menutech - Fix mobile issues',
          startdate: new Date('2018-04-05 00:00:00'),
          duedate: new Date('2018-04-21 00:00:00'),
          priority: 1,
          description: '',
          type: 'development',
          estimated: 4,
          hyperlink: 'https://igeltech.atlassian.net/projects/MT/issues/MT-36',
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'igel.tech')]
        });

        data.push({
          name: 'CAALA - Revise frontpage',
          startdate: new Date('2018-04-13 00:00:00'),
          duedate: new Date('2018-05-14 00:00:00'),
          priority: 1,
          description: '',
          type: 'development',
          estimated: 8,
          hyperlink: 'https://igeltech.atlassian.net/projects/MT/issues/MT-36	https://igeltech.atlassian.net/projects/CAALA/issues/CAALA-33',
          closed: false,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'igel.tech')]
        });

        data.push({
          name: 'CAALA - Knowledge Base',
          startdate: new Date('2018-01-24 00:00:00'),
          duedate: new Date('2018-02-10 00:00:00'),
          priority: 2,
          description: '',
          type: 'development',
          estimated: 40,
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'igel.tech')]
        });

        data.push({
          name: 'Kereső javítása (országos keresés)',
          startdate: new Date('2018-04-24 00:00:00'),
          duedate: new Date('2018-04-24 00:00:00'),
          priority: 3,
          description: '',
          type: 'development',
          estimated: 6,
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'Microker')]
        });

        data.push({
          name: 'I. mérföldkő',
          startdate: new Date('2018-04-06 00:00:00'),
          duedate: new Date('2018-04-19 00:00:00'),
          priority: 1,
          description: 'Admin felület kialakítása, ahol a tartalmi elemek módosíthatók, valamint a regisztrált felhasználókat lehessen kezelni és gyűjteni',
          type: 'development',
          estimated: 34,
          closed: false,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'Microker')]
        });

        data.push({
          name: 'II. mérföldkő',
          startdate: new Date('2018-04-06 00:00:00'),
          duedate: new Date('2018-04-11 00:00:00'),
          priority: 1,
          description: 'Angol verzió kialakítása (pontos szöveges fordításokat nem tartalmaz)',
          type: 'development',
          estimated: 16,
          closed: false,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'Microker')]
        });

        data.push({
          name: 'III. mérföldkő',
          startdate: new Date('2018-04-06 00:00:00'),
          duedate: new Date('2018-05-18 00:00:00'),
          priority: 1,
          description: 'Geolocation kiterjesztése a világra',
          type: 'development',
          estimated: 30,
          closed: false,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'Microker')]
        });

        data.push({
          name: 'Termelői adatlap javítás',
          startdate: new Date('2018-05-02 00:00:00'),
          duedate: new Date('2018-05-18 00:00:00'),
          priority: 3,
          description: '',
          type: 'development',
          estimated: 30,
          closed: true,
          user: user._id,
          client: this.clients[_.findIndex(this.clients, client => client.company === 'Microker')]
        });
      }
    }

    return data;
  }
}

export default TicketsSeeder;

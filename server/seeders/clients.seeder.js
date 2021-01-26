// Load modules
import { Seeder } from 'mongoose-data-seed';

// Load Client model
import Client from '../api/client/Client';

// Seeding data
const data = [
  {
    company: 'Evista Ltd',
    email: 'info@e-vista.hu',
    phone: '+36706300240',
    website: 'https://evista.hu/',
    logo: 'http://localhost:32781/images/P1JDdJL4lo2svPNxYiltkrChhyiQM8Ym.jpeg'
  },
  {
    company: 'VCC Live',
    email: 'info@vcc.live',
    phone: '+3612345678',
    website: 'https://vcc.live',
    logo: 'http://localhost:32781/images/p7FtWMwiOx8Y0MoX8SCQQStx4TIApDfn.jpeg',
    contact: 'Viktor Varga'
  },
  {
    company: 'igel.tech',
    email: 'info@igel.tech',
    phone: '+4915175485751',
    website: 'https://www.igel.tech/',
    logo: 'http://localhost:32781/images/9BCjv7B5f56YthNA3ew9xO1j5yynsbQP.png',
    contact: 'Lukas Klement'
  },
  {
    company: 'Creatum',
    email: 'info@creatum.hu',
    website: 'http://creatum.hu',
    logo: 'http://localhost:32781/images/swKI4548RJIGe4pGFWiByq65e9EBhOUn.png',
    contact: 'Zoltán Csility'
  },
  {
    company: 'Microker',
    email: 'info@microker.hu',
    phone: '+36301234567',
    website: 'https://microker.hu',
    logo: 'http://localhost:32781/images/xkLOnESfsBgNYJn4t5069LyAesy2OmBX.jpeg',
    contact: 'Éva Lengyel'
  },
  {
    company: 'MovistarTeam',
    email: 'info@movistarteam.com',
    phone: '+731473639',
    website: 'http://movistarteam.com/',
    logo: 'http://localhost:32781/images/y9r7pjhE420rQln9Tldt.png',
    contact: 'Edelia Meraz Solorio'
  }
];

class ClientsSeeder extends Seeder {

  /**
   * Only runs when Client document is empty
   */
  async shouldRun() {
    return Client.count().exec().then(count => count === 0);
  }

  /**
   * Create clients
   */
  async run() {
    return Client.create(data);
  }
}

export default ClientsSeeder;

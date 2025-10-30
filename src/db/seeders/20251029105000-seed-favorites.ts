import { QueryInterface } from 'sequelize';
// import { v4 as uuidv4 } from 'uuid';
import { randomUUID } from 'crypto';


export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert('favorites', [
      {
        id: randomUUID(),
        title: 'Inception',
        type: 'Movie',
        director: 'Christopher Nolan',
        budget: 160000000,
        location: 'Los Angeles, USA',
        duration: '2h 28m',
        year_or_time: '2010',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: randomUUID(),
        title: 'The Dark Knight',
        type: 'Movie',
        director: 'Christopher Nolan',
        budget: 185000000,
        location: 'Chicago, USA',
        duration: '2h 32m',
        year_or_time: '2008',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: randomUUID(),
        title: 'Breaking Bad',
        type: 'TV Show',
        director: 'Vince Gilligan',
        budget: 3000000,
        location: 'Albuquerque, USA',
        duration: '5 Seasons',
        year_or_time: '2008–2013',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: randomUUID(),
        title: 'Stranger Things',
        type: 'TV Show',
        director: 'The Duffer Brothers',
        budget: 12000000,
        location: 'Atlanta, USA',
        duration: '4 Seasons',
        year_or_time: '2016–Present',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete('favorites', {}, {});
  },
};

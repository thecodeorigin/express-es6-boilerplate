import faker from 'faker';
import bcrypt from 'bcrypt';

export default function seed(knex) {
  return knex('users')
    .del()
    .then(async () => {
      const users = [];
      const password = await bcrypt.hash('123456', 15);
      for (let i = 0; i < 100; i += 1) {
        const email = faker.internet.email();
        const name = faker.name.findName();
        users.push({ email, name, password });
      }
      return knex('users').insert(users);
    });
}

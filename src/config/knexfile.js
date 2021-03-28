import './env';

export default {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      charset: 'utf8',
    },
    migrations: {
      directory: `${__dirname}/../database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/../database/seeds`,
    },
  },
};

export default {
  server: {
    host: '0.0.0.0',
    port: 3000,
    jwtSecret: 'base-api',
    jwtExpiration: '1h'
  },
  database: {
    connectionString: 'mongodb://127.0.0.1:27017/node-boilerplate'
  },
  bcrypt: {
    saltRounds: 5
  }
};

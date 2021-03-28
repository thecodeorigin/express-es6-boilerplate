import knex from 'knex';
import config from './knexfile';
import './env';

const environment = process.env.ENVIRONMENT || 'development';
const connection = knex(config[environment]);
export default connection;

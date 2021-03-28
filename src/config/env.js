import dotenv from 'dotenv';
// This separated file is used to config env, import this file into any file to start using process.env
dotenv.config({ path: `${__dirname}/../../.env` });

import Env from 'dotenv';
import Server from './bootstrap';

Env.config();
Server.boot();

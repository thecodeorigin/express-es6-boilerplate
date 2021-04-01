import {
  banner
} from './banner';
import logger from '../plugins/Winston';
import ExpressProvider from '../providers/ExpressProvider';

export default class ServerBooter {
  static async boot() {
    try {
      await Promise.all([
        // new KnexProvider().checkConnection(),
        new ExpressProvider().register()
        // new HapiProvider().register()
      ]);
      console.log("Server OK")
    } catch (error) {
      logger.error('Server is crashed !');
    }
  }
}

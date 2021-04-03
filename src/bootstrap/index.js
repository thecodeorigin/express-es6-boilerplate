import logger from '../utils/Winston';
import ExpressProvider from '../providers/ExpressProvider';

export default class ServerBooter {
  static async boot() {
    try {
      // await Promise.all([new ExpressProvider().register()]);
      new ExpressProvider().register();
    } catch (error) {
      logger.error('Server is crashed !');
    }
  }
}

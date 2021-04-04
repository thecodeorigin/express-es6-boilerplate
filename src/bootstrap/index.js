import logger from '../plugins/Winston';
import ExpressProvider from '../providers/ExpressProvider';
import MongooseProvider from '../providers/MongooseProvider';

export default class ServerBooter {
  static async boot() {
    try {
      MongooseProvider.getInstance().connect();
      ExpressProvider.getInstance().register();
    } catch (error) {
      console.log("🚀 >> file: index.js >> line 17 >> ServerBooter >> boot >> error", error)
      logger.error('Server is crashed !');
    }
  }
}

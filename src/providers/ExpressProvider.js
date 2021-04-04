import { getServerConfigs } from "../configs";
// import { bind } from '../api/routes';
import logger from "../plugins/Winston";
// import AuthPlugin from '../plugins/AuthPlugin';
// import SwaggerPlugin from '../plugins/SwaggerPlugin';
// import errorCode from '../constants/errors'
import chalk from 'chalk'
import winston from "winston";
import expressWinston from "express-winston";
import Express from "express";
import cookieParser from "cookie-parser";
import routes from "../api/router";
export default class ExpressProvider {
  static instance;
  constructor() {
    this.port = process.env.APP_PORT || getServerConfigs().port;
    this.host = process.env.APP_HOST || getServerConfigs().host;
    this.app = null;
  }
  static getInstance() {
    if (!ExpressProvider.instance) {
      ExpressProvider.instance = new ExpressProvider()
    }
    return ExpressProvider.instance;
  }


  settingLogger() {
    if (!this.app) {
      this.app = new Express();
    }
    if (this.app.get('env') !== "development") {
      this.app.use(
        expressWinston.logger({
          winstonInstance: logger,
          msg:
            '{{req.method}} {{req.url}} {{res.statusCode}} - {{res.responseTime}}ms',
        })
      );
    }

    this.app.use(
      expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
      })
    );
  }

  // Seting routes
  settingRoutes() {
    routes.forEach((route) => {
      if (this.app.get("env") !== "test") {
        console.log(
          `${chalk.green("✓")} ${chalk.bold.blue(
            route.method.toUpperCase()
          )}: ${chalk.blue(route.path)} configured and setup.`
        );
      }
      this.app[route.method](`/api${route.path}`, ...route.handlers);
    });
    // console.log("######## ", this.app)
    // 404 error handler
    this.app.use((req, res) =>
      res.status(404).json({
        status: "error",
        code: 404,
        message: `${req.url} not found`,
      })
    );
  }

  register() {
    try {
      if (!this.server) {
        this.app = new Express();
      }
      this.app.use(Express.json());
      this.app.use(Express.urlencoded({ extended: false }));
      this.app.use(cookieParser());
      this.settingLogger();
      this.settingRoutes();
      this.app.listen(this.port)
      return;
      // // const server = new Hapi.Server({
      // //   host: this.host,
      // //   port: this.port,
      // //   routes: {
      // //     cors: {
      // //       origin: ['*']
      // //     }
      // //   }
      // // });
      // server.ext("onPreResponse", (request, h) => {
      //   const response = request.response;
      //   if (response.isBoom) {
      //     response.output.headers["version"] = process.env.VERSION || "1.0.0";
      //     response.output.headers["web-version"] =
      //       process.env.WEB_VERSION || "1.0.0";
      //     response.output.headers["android-version"] =
      //       process.env.ANDROID_VERSION || "1.0.0";
      //     response.output.headers["ios-version"] =
      //       process.env.IOS_VERSION || "1.0.0";
      //     response.output.payload.description =
      //       errorCode[response.output.payload.message] || "No description";
      //     return h.continue;
      //   }
      //   response.headers["version"] = process.env.VERSION || "1.0.0";
      //   response.headers["web-version"] = process.env.WEB_VERSION || "1.0.0";
      //   response.headers["android-version"] =
      //     process.env.ANDROID_VERSION || "1.0.0";
      //   response.headers["ios-version"] = process.env.IOS_VERSION || "1.0.0";
      //   return h.continue;
      // });
      // await new AuthPlugin().register(server);
      // await new SwaggerPlugin().register(server);
      // await this.setting(server);

      // logger.info("> Hapi OK");
      return server;
    } catch (error) {
      logger.error("Hapi provider error: ", error);
    }
  }
}

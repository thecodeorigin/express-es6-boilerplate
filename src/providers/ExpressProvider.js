import Configs from "../configs";
// import { bind } from '../api/routes';
import logger from "../plugins/Winston";
// import AuthPlugin from '../plugins/AuthPlugin';
// import SwaggerPlugin from '../plugins/SwaggerPlugin';
// import errorCode from '../constants/errors'
import winston from "winston";
import expressWinston from "express-winston";
import Express from "express";
import cookieParser from "cookie-parser";
import routes from "../api/router";
export default class ExpressProvider {
  constructor() {
    this.port = process.env.APP_PORT || Configs.getServerConfigs().port;
    this.host = process.env.APP_HOST || Configs.getServerConfigs().host;
    this.app = null;
  }

  /**
   * Setting initial feature and plugins
   */
  setting(server) {
    const routes = bind(server);
    // Promise.all(routes);
  }

  settingLogger() {
    if (!this.app) {
      this.app = new Express();
    }
    this.app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.json()
        ),
        msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
        expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) {
          return false;
        }, // optional: allows to skip some log messages based on request and/or response
      })
    );

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
      if (app.get("env") !== "test") {
        console.log(
          `${chalk.green("✓")} ${chalk.bold.blue(
            route.method.toUpperCase()
          )}: ${chalk.blue(route.path)} configured and setup.`
        );
      }
      this.app[route.method](`${route.path}`, ...route.handlers);
    });

    // 404 error handler
    this.app.use((req, res) =>
      res.status(404).json({
        status: "error",
        code: 404,
        message: `${req.url} not found`,
      })
    );
  }

  async register() {
    try {
      if (!this.server) {
        this.app = new Express();
      }
      this.app.use(Express.json());
      this.app.use(Express.urlencoded({ extended: false }));
      this.app.use(cookieParser());
      this.settingLogger();
      this.settingRoutes();
      // console.log(this.app)
      return;
      // const server = new Hapi.Server({
      //   host: this.host,
      //   port: this.port,
      //   routes: {
      //     cors: {
      //       origin: ['*']
      //     }
      //   }
      // });
      server.ext("onPreResponse", (request, h) => {
        const response = request.response;
        if (response.isBoom) {
          response.output.headers["version"] = process.env.VERSION || "1.0.0";
          response.output.headers["web-version"] =
            process.env.WEB_VERSION || "1.0.0";
          response.output.headers["android-version"] =
            process.env.ANDROID_VERSION || "1.0.0";
          response.output.headers["ios-version"] =
            process.env.IOS_VERSION || "1.0.0";
          response.output.payload.description =
            errorCode[response.output.payload.message] || "No description";
          return h.continue;
        }
        response.headers["version"] = process.env.VERSION || "1.0.0";
        response.headers["web-version"] = process.env.WEB_VERSION || "1.0.0";
        response.headers["android-version"] =
          process.env.ANDROID_VERSION || "1.0.0";
        response.headers["ios-version"] = process.env.IOS_VERSION || "1.0.0";
        return h.continue;
      });
      await new AuthPlugin().register(server);
      await new SwaggerPlugin().register(server);
      await this.setting(server);

      logger.info("> Hapi OK");
      return server;
    } catch (error) {
      logger.error("Hapi provider error: ", error);
    }
  }
}

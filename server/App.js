const http = require('http');
const path = require('path');
const express = require('express');
const logger = require('./utils/logger');
// const helper = require('./utils/helper');
const config = require('./config');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const interval = config.TimeSet.interval || (30 * 1000);

/**
 * App server functions
 *  - initialize all application objects
 *  - start Web server / Socket.io server
 *  - start to schedule to monintor all containers
 * 
 * @class App
 */
class App {
  /**
   * Create the application objects.
   * 
   */
  constructor() {
    this.app = express();
    this.containerService = new (require('./services/ContainerServices'))(
      config.ContainerConfigurations,
    );
    this.socketIOService = new (require('./services/SocketIOServices'))(
      this.containerService,
    );

    this.scheduleService = new (require('./services/ScheduleService'))(
      this.containerService, this.socketIOService, interval,
    );

    this.initialize = this.initialize.bind(this);
    this.start = this.start.bind(this);
  }

  /**
   * Initializes the application.
   * 
   */
  initialize() {
    // helper.setupTerminationHandlers();

    this.app.use(express.static(publicPath));
  }

  /**
   *  Start the server.
   * 
   */
  async start() {
    try {
      //  Start the app on the specific interface (and port).
      const server = await http.createServer(this.app);

      await server.listen(port);
      // server.on('error', helper.onError);
      logger.log('info', '%s: Baz-Truck server started  ...', Date(Date.now()));

      // Start the socket.io service which will send real-time data to clients.
      await this.socketIOService.initialize(server);
      logger.log('info', '%s: Baz-Truck socket.io service started ...', Date(Date.now()));

      // Start the core schedule service.
      this.scheduleService.start();
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  }
}

module.exports = App;

const socketIO = require('socket.io');
const logger = require('../utils/logger');

const {
  generateMessage,
} = require('../utils/message');

/**
 * Socket.io Service
 *  - Accept connections
 *  - broadcast data
 * 
 * @class SocketIOServices
 */
class SocketIOServices {
  /**
   * Create the SocketIOServices objects.
   * 
   */
  constructor(containers) {
    this.io = null;
    this.containers = containers;

    this.initialize = this.initialize.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  sendInitialData(socket) {
    const { containers } = this;

    logger.log('info', '%s: A user connected ...', Date(Date.now()));

    if (containers) {
      socket.emit('initialData', containers.fetchAllContainersCacheData());

      return true;
    }
    return false;
  }

  /**
   *  Initialize socket.io service.
   * 
   *  @param {object} server  http server.
   *  @returns {bool} result
   */
  initialize(server) {
    this.io = socketIO(server);

    this.io.on('connection', socket => this.sendInitialData(socket));

    return true;
  }

  /**
   *  Broadcast data to all users.
   * 
   *  @param {object} data  new temperature data of the containers.
   *  @returns {bool} result 
   */
  sendData(data) {
    if (!this.io) {
      logger.warn('%s: socket.io has\'nt started....', Date(Date.now()));
      return false;
    }

    this.io.emit('newData', generateMessage(data));

    return true;
  }
}

module.exports = SocketIOServices;

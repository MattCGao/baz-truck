const logger = require('../utils/logger');

/**
 * Schedule Service
 *  - 
 * 
 * @class ScheduleService
 */
class ScheduleService {
  /**
   * Create the ScheduleService objects.
   * 
   */
  constructor(containers, socket, interval) {
    this.containers = containers;
    this.socket = socket;
    this.interval = interval;
    this.intervalTimer = null;

    this.start = this.start.bind(this);
    this.schedule = this.schedule.bind(this);
  }

  /**
   * Check all containers and send data to clients
   * 
   * @returns {bool} result
   */
  schedule() {
    const { containers, socket } = this;

    // check every container
    const newData = containers.fetchAllContainersData();

    // send new data
    if (newData.length > 0) {
      socket.sendData(newData);
    }

    return true;
  }

  /**
   * Start an infinite loop to monitor all containers
   *   
   * @returns {bool} result
   */
  start() {
    const {
      containers, socket, interval, schedule,
    } = this;

    if (!containers || !socket) {
      logger.error('%s: No containers or Socket.io...');
      return false;
    }

    logger.log('info', '%s: Baz-Truck start to schedule ...', Date(Date.now()));

    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
    }

    this.intervalTimer = setInterval(schedule, interval);

    return true;
  }
}

module.exports = ScheduleService;

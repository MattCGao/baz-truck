const logger = require('../utils/logger');
const config = require('../config');

/**
 * Simulate a Container 
 * 
 * @class Container
 */
class Container {
  /**
   * Initialize the container
   * 
   * @param {object} info - container basic configuration 
   */
  constructor(info) {
    this.id = info.id || 0;
    this.name = info.name || '';
    this.type = info.type;
    this.temperature = 0;
    this.status = 'Good';
    this.description = 'Healthy';

    // interval time: 3 * (process.env.INTERVAL || 30*1000)
    this.interval = config.TimeSet.sampleTime || 3; // 3

    // current loop time, if counter >= interval then fetch data & reset counter
    this.counter = 0;

    // current abnormal loop, if abnormal counter >= threshold then alert
    this.abnormalCounter = 0;

    this.fetchData = this.fetchData.bind(this);
    this.manipulateTemperature = this.manipulateTemperature.bind(this);
  }

  /**
   * mock fetch the current temperature.
   * 
   * @returns {object} temperature (random value: 3 - 9)
   */
  fetchData() {
    const { id, name, type } = this;
    this.temperature = Math.floor(Math.random() * 7 + 3); // value: 3 - 9
    return {
      id,
      name,
      type,
      temperature: this.temperature,
    };
  }

  /**
   * mock to manipulate the temperature.
   * 
   * @param {string} action 
   * @returns {bool} true
   */
  manipulateTemperature(action) {
    logger.log('warn', '%s: %s executing the command : %s ... ', Date(Date.now()), this.name, action);

    return true;
  }
}

module.exports = Container;

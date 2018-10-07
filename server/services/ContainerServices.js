const config = require('../config');
const logger = require('../utils/logger');
const Container = require('../models/Container');

/**
 * Manage all containers
 * 
 * @class ContainerServices
 */
class ContainerServices {
  /**
   * Create all containers according to configurations
   * 
   * @param {Array} containersConfiguration 
   * 
   */
  constructor(containersConfiguration) {
    this.containers = [];
    if (containersConfiguration && (containersConfiguration.constructor === Array)) {
      containersConfiguration.forEach((element) => {
        this.containers.push(new Container(element));
      });
    }

    this.fetchAllContainersCacheData = this.fetchAllContainersCacheData.bind(this);
    this.fetchAllContainersData = this.fetchAllContainersData.bind(this);
  }

  /**
   * 
   */
  fetchAllContainersCacheData() {
    const { containers } = this;

    if (containers.length > 0) {
      const results = containers.map(container => ({
        id: container.id,
        name: container.name,
        beerInfo: config.BeerTypes[container.type],
        temperature: container.temperature,
        status: container.status,
        description: container.description,
      }));

      return results;
    }
    return [];
  }

  /**
   * fetch all containers' data & analyse data
   * 
   *  1. decide whether to fetch the new data.
   *   - if container.counter === 0 then
   *   -- fetch the new data
   *  2. analyse the container temperature
   *   - if the temperature is Abnormal
   *   -- manipulate -- heating / cooling
   *   -- record: container.abnormalCounter ++
   *   -- reduce the sample interval to monitor it more frequently
   *   --- container.interval --
   *   - if the temperature is Normal
   *   -- reset container.interval & container.abnormalCounter
   *  3. alert if the temperature is abnormal for a long time
   *   -- container.abnormalCounter > config.TimeSet.abnormalTime
   *  4. calculate the next sample time
   *   - container.counter ++
   *   - if (container.counter >= container.interval)
   *   -- container.counter = 0
   * 
   * @returns {Array} all containers real-time data
   */
  fetchAllContainersData() {
    if (this.containers.length > 0) {
      const result = [];

      logger.log('info', '%s: ===============================================', Date(Date.now()));
      logger.log('info', '%s: start to fetch real-time data', Date(Date.now()));
      this.containers.forEach((container) => {
        if (!container.counter) {
          // fetch the temperature.
          const data = container.fetchData();

          data.beerInfo = config.BeerTypes[container.type];
          data.status = 'Good';
          data.description = 'Healthy';

          // judge whether need to manipulate
          if ((data.temperature >= config.BeerTypes[container.type].lower)
            && (data.temperature <= config.BeerTypes[container.type].upper)) {
            container.interval = config.TimeSet.sampleTime || 3; // reset to default interval
            if (container.abnormalCounter > 0) {
              logger.log('info', '%s: %s \'s temperature is normal now ... ', Date(Date.now()), container.name);
            }
            container.abnormalCounter = 0; // reset
          } else {
            if (data.temperature < config.BeerTypes[container.type].lower) {
              data.status = 'Warning';
              data.description = 'Too Low';
              logger.log('warn', '%s: %s \'s temperature is too low ... ', Date(Date.now()), container.name);
              container.manipulateTemperature('heating');
            }
            if (data.temperature > config.BeerTypes[container.type].upper) {
              logger.log('warn', '%s: %s \'s temperature is too high ... ', Date(Date.now()), container.name);
              container.manipulateTemperature('cooling');
              data.status = 'Warning';
              data.description = 'Too Hot';
            }

            // reduce the container.interval to monitor the real-time value more frequently
            container.interval = container.interval > 1 ? (container.interval - 1) : 1;

            // record the abnormal stauts lasting time
            container.abnormalCounter += 1;
            if (container.abnormalCounter > (config.TimeSet.abnormalTime || 2)) {
              data.status = 'Wrong';
              data.description = 'Something Wrong';
              logger.log('error', '%s: %s may be in a wrong condition ... ', Date(Date.now()), container.name);
            }
          }

          // cache the current data
          container.status = data.status;
          container.description = data.description;

          result.push(data);
        }

        container.counter += 1;

        if (container.counter >= container.interval) {
          container.counter = 0;
        }
      });

      logger.log('info', '%s: Fetched real-time data of %d container(s)', Date(Date.now()), result.length);
      return result;
    }

    return [];
  }
}

module.exports = ContainerServices;

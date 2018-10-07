/* eslint no-unused-vars: 0 */

const ContainerServices = require('../ContainerServices');
const Container = require('../../models/Container');

let containerServices;

describe('ContainerServices Class', () => {
  beforeEach(() => {
    containerServices = new ContainerServices([
      {
        id: 1,
        name: 'container 1',
        type: 2,
      },
      {
        id: 2,
        name: 'container 2',
        type: 1,
      },
    ]);

    return containerServices;
  });

  test('should create a ContainerServices object', () => {
    const tmpContainerServices = new ContainerServices([
      {
        id: 1,
        name: 'container 1',
        type: 2,
      },
      {
        id: 2,
        name: 'container 2',
        type: 1,
      },
    ]);

    expect(tmpContainerServices.containers.length).toEqual(2);
  });

  test('should fetch all containers cache data', () => {
    const result = containerServices.fetchAllContainersCacheData();

    expect(result).not.toBeNull();
    expect(result.length).toEqual(2);
  });

  test('should fetch all containers cache data', () => {
    containerServices.containers = [];
    const result = containerServices.fetchAllContainersCacheData();

    expect(result).not.toBeNull();
    expect(result.length).toEqual(0);
  });

  test('should fetch all real-time data from containers', () => {
    const result = containerServices.fetchAllContainersData();

    expect(result).not.toBeNull();
    expect(result.length).toEqual(2);
  });

  test('should process the abnormal status', () => {
    containerServices.containers[0].counter = 2;
    containerServices.containers[0].abnormalCounter = 3;

    const result = containerServices.fetchAllContainersData();

    expect(result).not.toBeNull();
    expect(result.length).toEqual(1);
  });

  test('should fetch no data for there is no any containers', () => {
    const emptyContainerServices = new ContainerServices();

    const result = emptyContainerServices.fetchAllContainersData();
    expect(result).not.toBeNull();
    expect(result.length).toEqual(0);
  });
});

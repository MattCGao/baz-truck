
const Container = require('../Container');
const config = require('../../config');

let container;

describe('Container Class', () => {
  beforeEach(() => {
    container = new Container({
      type: 1,
    });

    return container;
  });

  test('should create a Container object', () => {
    expect(container.id).toEqual(0);
    expect(container.name).toEqual('');
    expect(container.type).toEqual(1);
    expect(container.interval).toEqual(config.TimeSet.sampleTime);
  });

  test('should fetch the Container real-time data', () => {
    const data = container.fetchData();

    expect(data.id).toEqual(container.id);
    expect(data.name).toEqual(container.name);
    expect(data.type).toEqual(container.type);
    expect(data.temperature).toBeLessThanOrEqual(9);
    expect(data.temperature).toBeGreaterThanOrEqual(3);
  });

  test('should manipulate the temperature', () => {
    const data = container.manipulateTemperature('cooling');

    expect(data).toBeTruthy();
  });
});

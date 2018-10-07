const ScheduleService = require('../ScheduleService');
const ContainerServices = require('../ContainerServices');
const SocketIOServices = require('../SocketIOServices');

let scheduleService;

describe('ScheduleService Class', () => {
  beforeEach(() => {
    const containerServices = new ContainerServices([
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
    const socketIOServices = new SocketIOServices(containerServices);

    scheduleService = new ScheduleService(
      containerServices, socketIOServices, 30 * 1000,
    );

    return scheduleService;
  });

  test('should create a ScheduleService object', () => {
    expect(scheduleService.containers).not.toBeNull();
    expect(scheduleService.socket).not.toBeNull();
    expect(scheduleService.interval).toEqual(30 * 1000);
  });

  test('should start an timer', () => {
    const result = scheduleService.start();

    expect(result).toBeTruthy();
  });

  test('should not start timer for there is no containers', () => {
    const tmpScheduleService = new ScheduleService(null, null, 30 * 1000);

    const result = tmpScheduleService.start();
    expect(result).toBeFalsy();
  });

  test('should not start timer for there is no socket', () => {
    scheduleService.intervalTimer = setInterval(() => {}, 10);

    const result = scheduleService.start();
    expect(result).toBeTruthy();
  });

  test('should check all containers and send data', () => {
    const result = scheduleService.schedule();

    expect(result).toBeTruthy();
  });
});

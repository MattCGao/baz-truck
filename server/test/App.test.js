const App = require('../App');

let app;

describe('App Class', () => {
  beforeEach(() => {
    app = new App();
  });

  test('should create App object', () => {
    expect(app.app).not.toBeNull();
    expect(app.containerService).not.toBeNull();
    expect(app.socketIOService).not.toBeNull();
    expect(app.scheduleService).not.toBeNull();
  });

  test('should initialize App object', () => {
    expect(app.initialize()).toBeUndefined();
  });

  test('should start the server', () => {
    expect(app.start()).not.toBeUndefined();
  });
});

const http = require('http');
const express = require('express');

const SocketIOServices = require('../SocketIOServices');
const ContainerServices = require('../ContainerServices');

let socketIOServices;

describe('SocketIOService Class', () => {
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
    socketIOServices = new SocketIOServices(containerServices);
  });

  test('should create a SocketIOService Class', () => {
    expect(socketIOServices.io).toBeNull();
    expect(socketIOServices.containers).toBeDefined();
  });

  test('should send initial data', () => {
    const result = socketIOServices.sendInitialData({
      emit: () => {},
    });

    expect(result).toBeTruthy();
  });

  test('should not send initial data', () => {
    socketIOServices.containers = null;
    const result = socketIOServices.sendInitialData({
      emit: () => {},
    });

    expect(result).toBeFalsy();
  });

  test('should initialize the socket.io service', () => {
    const app = express();
    const server = http.createServer(app);
    result = socketIOServices.initialize(server);

    expect(socketIOServices.io).toBeDefined();
    expect(result).toBeTruthy();
  });

  test('should not broadcast data to all users', () => {
    const result = socketIOServices.sendData({
      id: 1,
      name: 'Container 1',
      type: 1,
      beerInfo: {
        name: 'Beer 1',
        lower: 4,
        upper: 6,
      },
    });

    expect(result).toBeFalsy();
  });

  test('should broadcast data to all users', () => {
    const app = express();
    const server = http.createServer(app);
    socketIOServices.initialize(server);

    const result = socketIOServices.sendData({
      id: 1,
      name: 'Container 1',
      type: 1,
      beerInfo: {
        name: 'Beer 1',
        lower: 4,
        upper: 6,
      },
    });

    expect(result).toBeTruthy();
  });
});

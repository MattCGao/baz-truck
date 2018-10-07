/**
 * define the parameters for containers.
 * 
 */
const ContainerConfigurations = [
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
  {
    id: 3,
    name: 'container 3',
    type: 3,
  },
  {
    id: 4,
    name: 'container 4',
    type: 0,
  },
  {
    id: 5,
    name: 'container 5',
    type: 4,
  },
  {
    id: 6,
    name: 'container 6',
    type: 2,
  },
];

/**
 * define the valid constants of each beer type.
 * 
 */
const BeerTypes = [
  {
    name: 'Beer 1',
    upper: 6,
    lower: 4,
  },
  {
    name: 'Beer 2',
    upper: 6,
    lower: 5,
  },
  {
    name: 'Beer 3',
    upper: 7,
    lower: 5,
  },
  {
    name: 'Beer 4',
    upper: 8,
    lower: 6,
  },
  {
    name: 'Beer 5',
    upper: 5,
    lower: 3,
  },
];

/**
 * Define the time constants
 */
const TimeSet = {
  interval: 30 * 1000,
  sampleTime: 3,
  abnormalTime: 2,
};

module.exports = {
  ContainerConfigurations,
  BeerTypes,
  TimeSet,
};

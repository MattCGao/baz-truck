
const {
  generateMessage,
} = require('../message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const data = {
      container: 1,
      temperature: 5.6,
      status: 'good',
    };
    const message = generateMessage(data);

    expect(message.data).toEqual(data);
    expect(message.createdAt).toBeLessThanOrEqual((new Date()).getTime());
  });
});

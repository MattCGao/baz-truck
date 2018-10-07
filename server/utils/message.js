/**
 * Add some extra information 
 * 
 * @param {object} data 
 * @returns {object}
 */
const generateMessage = data => ({
  data,
  createdAt: (new Date()).getTime(),
});

module.exports = {
  generateMessage,
};

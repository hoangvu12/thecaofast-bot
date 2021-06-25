const Client = require("../Client");

function getChannel(name) {
  return Client.channels.cache.find((channel) => channel.name == name);
}

module.exports = {
  getChannel,
};

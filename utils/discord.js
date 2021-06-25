const Client = require("../Client");

function getChannel(name) {
  return Client.channels.cache.find((channel) => channel.name == name);
}

function isValidRole(query, memberRoles) {
  const [operator, roles] = Object.entries(query)[0];

  let isValid = false;

  if (operator === "$or") {
    for (let i = 0; i < roles.length; i++) {
      if (isValid) break;
      isValid = memberRoles.get(roles[i]);
    }
  } else if (operator === "$and") {
    for (let i = 0; i < roles.length; i++) {
      const role = memberRoles.get(roles[i]);

      if (!role) {
        isValid = false;

        break;
      }

      isValid = true;
    }
  }

  return isValid;
}

module.exports = {
  getChannel,
  isValidRole,
};

function getGuilds(client) {
  return client.guilds.cache;
}

function isInGuild(guildId, client) {
  const guilds = getGuilds(client);

  return guilds.filter((guild) => guildId === guild.d);
}

module.exports = {
  getGuilds,
  isInGuild,
};

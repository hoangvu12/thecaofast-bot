const Discord = require("discord.js");

const colors = {
  success: "#10B981",
  failed: "#EF4444",
};

module.exports = {
  name: "test",
  description: "test",
  execute(message) {
    const cardEmbed = new Discord.MessageEmbed()
      .setColor(colors.failed)
      .setTitle("Duyệt thẻ tự động")
      .setURL("https://thecaofast.vercel.app")
      .setAuthor(
        "TheCaoFast",
        "https://cdn.discordapp.com/icons/755083575937990766/f927567294dff1e56f2f0bd958010431.png?size=128",
        "https://thecaofast.vercel.app"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/icons/755083575937990766/f927567294dff1e56f2f0bd958010431.png"
      )
      .addFields(
        { name: "Trạng thái", value: "Thành công", inline: true },
        { name: "ID", value: "687349873983697", inline: true },
        { name: "Mã thẻ", value: "82572837532" },
        { name: "Serial", value: "2873592835" },
        { name: "Mệnh giá", value: "10.000 VNĐ" },
        { name: "Loại thẻ", value: "Viettel" }
      )
      .setTimestamp()
      .setFooter(
        "",
        "https://cdn.discordapp.com/icons/755083575937990766/f927567294dff1e56f2f0bd958010431.png?size=128"
      );

    message.channel.send(cardEmbed);
  },
};

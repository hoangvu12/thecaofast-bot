const Discord = require("discord.js");

const Client = require("../Client");
const { numberWithCommas, capitalizeFirstLetter } = require("../utils");
const { getChannel } = require("../utils/discord");

const channelName = "thecao-log";

const colors = {
  success: "#10B981",
  failed: "#EF4444",
};
class OrdersController {
  static callback(req, res) {
    const { orderId, cardNumber, cardSerial, cardAmount, cardType, success } =
      req.body;

    const guild = Client.guilds.cache.first();

    let channel = getChannel(channelName);

    if (!channel) {
      guild.channels.create(channelName, {
        reason: `No ${channelName} channel found`,
      });

      channel = getChannel(channelName);
    }

    const cardEmbed = new Discord.MessageEmbed()
      .setColor(success ? colors.success : colors.failed)
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
        {
          name: "Trạng thái",
          value: success ? "Thành công" : "Thất bại",
          inline: true,
        },
        { name: "ID", value: orderId, inline: true },
        { name: "Mã thẻ", value: cardNumber },
        { name: "Serial", value: cardSerial },
        { name: "Mệnh giá", value: `${numberWithCommas(cardAmount)} VNĐ` },
        { name: "Loại thẻ", value: capitalizeFirstLetter(cardType) }
      )
      .setTimestamp()
      .setFooter(
        "",
        "https://cdn.discordapp.com/icons/755083575937990766/f927567294dff1e56f2f0bd958010431.png?size=128"
      );

    channel.send(cardEmbed);

    res.json({ success: true });
  }
}

module.exports = OrdersController;

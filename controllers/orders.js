const Client = require("../Client");
const { getCurrentTime } = require("../utils");
const { getChannel } = require("../utils/discord");

const channelName = "thecao-log";

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

    const message = `
Duyệt thẻ tự động:

Mã thẻ: ${cardNumber}
Serial: ${cardSerial}
Mệnh giá: ${cardAmount}
Loại thẻ: ${cardType}
ID: ${orderId}

Trạng thái: ${success ? "Thành công" : "Thất bại"}

${getCurrentTime().formatted}
`;

    channel.send(message);

    res.json({ success: true });
  }
}

module.exports = OrdersController;

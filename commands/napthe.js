const { isValidCard } = require("../utils");
const { createOrder } = require("../utils/api");

const SUPPORTED_CARDS = [
  "Viettel",
  "Vinaphone",
  "Mobifone",
  "VTC",
  "Garena",
  "Zing",
  "Gate",
];

module.exports = {
  name: "napthe",
  description: "Cho phép người dùng nạp thẻ!",
  async execute(message) {
    let channel = message.author.dmChannel;
    if (!channel) channel = await message.author.createDM();

    channel.send(`Nhập loại thẻ (${SUPPORTED_CARDS.join(", ")})`);

    const cardType = await getCardType(channel);

    channel.send("Nhập mã thẻ");

    const cardNumber = await getCardNumber(channel, cardType);

    channel.send("Nhập seri");

    const cardSerial = await getCardSerial(channel, cardType);

    channel.send("Nhập mênh giá. (VD: 10000)");

    const cardAmount = await getCardAmount(channel);

    const order = await createOrder({
      cardType,
      cardNumber,
      cardSerial,
      cardAmount,
    });

    if (!order.success) {
      return channel.send("Đã có lỗi xảy ra! Vui lòng thử lại");
    }

    if (!order.response.success) {
      return channel.send(`Nạp thẻ thất bại: ${order.response.message}`);
    }

    channel.send("Nạp thẻ thành công! Thẻ sẽ được duyệt sau 5-10 phút");
  },
};

async function getCardAmount(channel) {
  const filter = (response) => !response.author.bot;

  const collectedMessages = await channel.awaitMessages(filter, {
    max: 1,
  });

  const message = collectedMessages.first().content;

  return message;
}

async function getCardSerial(channel, cardType) {
  const filter = (response) => !response.author.bot;

  const collectedMessages = await channel.awaitMessages(filter, {
    max: 1,
  });

  const message = collectedMessages.first().content;

  if (!isValidCard({ cardSerial: message, cardType })) {
    channel.send("Định dạng thẻ sai!");

    return getCardSerial(channel, cardType);
  }

  return message;
}

async function getCardNumber(channel, cardType) {
  const filter = (response) => !response.author.bot;

  const collectedMessages = await channel.awaitMessages(filter, {
    max: 1,
  });

  const message = collectedMessages.first().content;

  if (!isValidCard({ cardNumber: message, cardType })) {
    channel.send("Định dạng thẻ sai!");

    return getCardNumber(channel, cardType);
  }

  return message;
}

async function getCardType(channel) {
  const filter = (response) =>
    SUPPORTED_CARDS.map((card) => card.toLowerCase()).includes(
      response.content.toLowerCase()
    );

  const collectedMessages = await channel.awaitMessages(filter, {
    max: 1,
  });

  return collectedMessages.first().content.toLowerCase();
}

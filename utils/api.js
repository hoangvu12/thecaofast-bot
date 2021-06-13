const axios = require("axios");

const BASE_URL = "https://thecaofast.vercel.app/api/v1";

async function createOrder({
  cardNumber,
  cardSerial,
  cardType,
  cardAmount,
  callbackUrl,
}) {
  const URL = `${BASE_URL}/orders`;

  const secretKey = process.env.SECRET_KEY;

  const postData = {
    cardNumber,
    cardSerial,
    cardType,
    cardAmount,
    secretKey,
  };

  if (callbackUrl) {
    postData.callbackUrl = callbackUrl;
  }

  const { data } = await axios.post(URL, postData);

  return data;
}

module.exports = {
  createOrder,
};

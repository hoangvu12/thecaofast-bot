const axios = require("axios");

const BASE_URL = "https://thecaofast.vercel.app/api/v1";

async function createOrder({ cardNumber, cardSerial, cardType, cardAmount }) {
  const URL = `${BASE_URL}/orders`;

  const secretKey = process.env.SECRET_KEY;

  const postData = {
    cardNumber,
    cardSerial,
    cardType,
    cardAmount,
    secretKey,
  };

  if (process.env.URL) {
    postData.callbackUrl = `${process.env.URL}/orders/callback`;
  }

  const { data } = await axios.post(URL, postData);

  return data;
}

module.exports = {
  createOrder,
};

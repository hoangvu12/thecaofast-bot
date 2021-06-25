function isValidCard({ cardNumber, cardSerial, cardType }) {
  const cardsSchema = {
    viettel: [
      { number: 13, serial: 11 },
      { number: 15, serial: 14 },
    ],
    vinaphone: [{ number: 14, serial: 14 }],
    mobifone: [{ number: 12, serial: 15 }],
    gate: [{ number: 10, serial: 10, startWith: "CB" }],
    garena: [{ number: 16, serial: 8 }],
  };

  const schema = cardsSchema[cardType];

  const card = schema.filter((cardSchema) => {
    if (cardSchema.startWith) {
      if (!cardSerial.startsWith(cardSchema.startWith)) {
        return false;
      }
    }

    if (!cardNumber) {
      return cardSchema.serial === cardSerial.length;
    }

    if (!cardSerial) {
      return cardSchema.number === cardNumber.length;
    }

    return (
      cardSchema.number === cardNumber.length &&
      cardSchema.serial === cardSerial.length
    );
  });

  return !!card.length;
}

function getCurrentTime() {
  const timezone = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  const currentDate = new Date(timezone);
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second =
    currentDate.getSeconds() < 10
      ? `0${currentDate.getSeconds()}`
      : currentDate.getSeconds();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formatted = `Lúc ${hour}:${minute}:${second}, ngày ${date}/${month}/${year}`;

  return {
    hour,
    minute,
    second,
    date,
    month,
    year,
    formatted,
  };
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
  isValidCard,
  getCurrentTime,
  numberWithCommas,
  capitalizeFirstLetter,
};

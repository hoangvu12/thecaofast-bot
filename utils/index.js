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

module.exports = {
  isValidCard,
};

const ordersRoute = require("./orders");

module.exports = (app) => {
  app.use("/orders", ordersRoute);
};

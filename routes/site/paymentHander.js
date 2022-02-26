const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { syncVariableTypesToDatabaseTypes } = require("../../middleware/utils");
const { rephraseOnlyQuery } = require("../../middleware/warriers");
const Razorpay = require("razorpay");

const { Campaign } = new PrismaClient();

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_fvPHjqq665nlyW",
  key_secret: "JiQSwUkRqudo0NfidN7Tjd0k",
});

router.post("/create_order", function (req, res) {
  const { amount, currency, receipt, notes } = req.body;
  razorpayInstance.orders.create(
    { amount, currency, receipt, notes },
    (err, order) => {
      if (!err) res.json(order);
      else res.send(err);
    }
  );
});

router.post("/payment_details", function (req, res) {
  const { razorpay_payment_id } = req.body;
  razorpayInstance.payments.fetch(razorpay_payment_id, (err, order) => {
    if (!err) res.json(order);
    else res.send(err);
  });
});

module.exports = router;

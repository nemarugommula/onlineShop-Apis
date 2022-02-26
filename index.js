require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { authenticationToken } = require("./middleware/utils");
const emailAuthHandler = require("./routes/auth/email");
const mobileAuthHandler = require("./routes/auth/mobile");
const productsHandler = require("./routes/product/product");
const userHandler = require("./routes/user/user");
const categoryHandler = require("./routes/product/category");
const cartItemHandler = require("./routes/cart/cart");
const shoppingSessionHandler = require("./routes/session/session");
const discountHandler = require("./routes/product/discount");
const inventoryHandler = require("./routes/product/inventory");
const orderHandler = require("./routes/session/order");
const orderItemHandler = require("./routes/session/order_item");
// const paymentHandler = require("./routes/payment/payment");
const siteHandler = require("./routes/site/site");
const imageHandler = require("./routes/site/imageHandler");
const campaignHandler = require("./routes/site/campaignHandler");
const ticketHandler = require("./routes/site/ticketHandler");
const productReview = require("./routes/site/productReviewHandler");
const paymentHandler = require("./routes/site/paymentHander");

app.use(express.json());
app.use(cors());

app.use("/api/auth/email", emailAuthHandler);
app.use("/api/auth/mobile", mobileAuthHandler);
app.use("/api/users", userHandler);
app.use("/api/products", productsHandler);
app.use("/api/categories", categoryHandler);
app.use("/api/cart", cartItemHandler);
app.use("/api/sessions", shoppingSessionHandler);
app.use("/api/discounts", discountHandler);
app.use("/api/inventory", inventoryHandler);
app.use("/api/orders", orderHandler);
app.use("/api/order_items", orderItemHandler);
// app.use("/api/payments", paymentHandler);
app.use("/api/site", siteHandler);
app.use("/api/image", imageHandler);
app.use("/api/campaigns", campaignHandler);
app.use("/api/tickets", ticketHandler);
app.use("/api/product_review", productReview);
app.use("/api/payment", paymentHandler);

app.get("/", (req, res) => {
  res.status(200).send(" Welcome to online Shop API store !!");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server created and listening on the port ${process.env.PORT} !!`
  );
});

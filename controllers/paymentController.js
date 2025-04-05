const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

exports.createOrder = async (req, res) => {
    console.log('inside create order');
    
  try {
    const { amount, currency } = req.body;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.verifyPayment = async (req, res) => {
  console.log('inside verify payment');
  
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign === razorpay_signature) {
      res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(406).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

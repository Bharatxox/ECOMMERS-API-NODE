const nodemailer = require("nodemailer");
const CouponModel = require("../models/coupon");

// const Razorpay = require("razorpay");
// const instance = new Razorpay({
//   key_id: "YOUR_KEY_ID",
//   key_secret: "YOUR_SECRET",
// });

const OrderModel = require("../models/order");
const ProductModule = require("../models/product");

const transpoter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: "kamalbisht819@gmail.com",
    pass: "wtsm fesn dspb fcoi",
  },
});

const placeOrder = async (req, res) => {
  //   console.log(req.body);
  const productsId = req.body.items.map((item) => item.product);
  const productsList = await ProductModule.find({ _id: productsId });

  const orderItems = req.body.items.map((item) => {
    const product = productsList.find((product) => product._id == item.product);
    return {
      productName: product.title,
      quantity: item.quantity,
      price: product.price,
    };
  });
  //   console.log(productsList.map((product) => product.price));

  // 1.check id item is in the stock
  const areItemsInStock = req.body.items.every(
    (p) =>
      productsList.find((product) => product._id == p.product).stock >=
      p.quantity
  );
  if (!areItemsInStock) {
    return res.status(400).json({
      success: false,
      message: "item is not available in stock",
    });
  }

  // 2. calculate the total amount
  let totalAmount = productsList.reduce((total, product) => {
    const productQty = req.body.items.find(
      (p) => p.product == product._id
    ).quantity;
    return total + product.price * productQty;
  }, 0);

  if (totalAmount > 500) {
    totalAmount += 50; //Delivery charges
  }

  // Apply coupon if present
  if (couponCode) {
    const coupon = await CouponModel.findOne({
      code: couponCode,
      isActive: true,
    });
    if (!coupon || coupon.expiryDate < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired coupon",
      });
    }
    totalAmount -= (totalAmount * coupon.discount) / 100;
  }

  // 3.if the order total is above 1000 then do not apply the user for cod

  // 4. if mode of payment is online redirect to payment gatway
  if (req.body.modeOfpayment === "ONLINE") {
    //REDIRECT to user payment gatway
    // const options = {
    //   amount: 50000, // amount in the smallest currency unit
    //   currency: "INR",
    //   receipt: "order_rcptid_11",
    // };
    // const abc = await instance.orders.create(options, function (err, order) {
    //   console.log(order);
    // });
  }

  // 5. Store the order details in DB
  const orderDetails = {
    items: req.body.items,
    totalAmount: totalAmount,
    deliveryAddress: req.body.deliveryAddress,
    billingAddress: req.body.deliveryAddress, //same a s delivery address
    modeOfpayment: req.body.modeOfpayment,
    orderStatus: "PENDING",
    user: req.user._id,
  };

  const { _id } = await OrderModel.create(orderDetails);
  const name = req.user.firstName + " " + req.user.lastName;
  const address =
    req.user.address.addressLane1 +
    " " +
    req.user.address.city +
    " " +
    req.user.address.state +
    " " +
    req.user.address.pincode;

  // 6. todo: send the email notifcation to  the user by email
  const mailOptions = {
    // to: req.user.email,
    to: "bharatxox7@gmail.com",
    from: "kamalbisht819@gmail.com",
    subject: "Test Mail",
    // text: "welcome to the test mail server",
    html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
            <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #4CAF50;
          color: #ffffff;
          padding: 10px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .content {
          padding: 20px;
        }
        .content h2 {
          font-size: 20px;
          color: #333333;
        }
        .content p {
          font-size: 16px;
          color: #666666;
          line-height: 1.5;
        }
        .order-details {
          margin: 20px 0;
        }
        .order-details table {
          width: 100%;
          border-collapse: collapse;
        }
        .order-details th, .order-details td {
          border: 1px solid #dddddd;
          padding: 8px;
          text-align: left;
        }
        .order-details th {
          background-color: #f2f2f2;
        }
        .footer {
          background-color: #f4f4f4;
          padding: 10px 20px;
          text-align: center;
          color: #999999;
          font-size: 14px;
        }
      </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Order Confirmation</h1>
              </div>
              <div class="content">
                <h2>Hi, ${name}!</h2>
                <p>Thank you for your purchase. Your order has been successfully completed and will be delivered to you soon. Below are the details of your order:</p>
                <div class="order-details">
                  <h3>Order Details</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${orderItems
                        .map(
                          (item) => `
                        <tr>
                          <td>${item.productName}</td>
                          <td>${item.quantity}</td>
                          <td>${item.price}</td>
                        </tr>
                      `
                        )
                        .join("")}
                    </tbody>
                  </table>
                </div>
                <div>
                <p><strong>Total Price:</strong> ${totalAmount}</p>
                </div>
                <p><strong>Order Number:</strong> ${_id}</p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Delivery Address:</strong> ${address}</p>
                <p>If you have any questions or need further assistance, please do not hesitate to contact our customer support team.</p>
                <p>Thank you for shopping with us!</p>
              </div>
              <div class="footer">
                <p>&copy; 2024 E-Commerce Company. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
  };

  transpoter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Mail not sent", error: err.message });
    } else {
      console.log(info);
      res.json({ success: true, message: "Mail sent successfully", info });
    }
  });

  // 7. update the Qty field of the product order
  req.body.items.forEach(async (product) => {
    await ProductModule.findByIdAndUpdate(product.product, {
      $inc: { stock: -product.quantity },
    });
  });

  res.status(200).json({
    status: true,
    message: "order placed succesfully",
    orderId: _id,
  });
  console.log("user name: ", req.user.firstName);
};

const orderController = { placeOrder };

module.exports = orderController;

// services/EmailService.js
const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

// Cấu hình transporter cho nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_ACCOUNT, // Thay bằng email của bạn
    pass: process.env.MAIL_PASSWORD, // Thay bằng mật khẩu ứng dụng của bạn
  },
});
// console.log("Email User:", process.env.MAIL_ACCOUNT);
// console.log("Email Pass:", process.env.MAIL_PASSWORD);
const sendOrderDeliveredEmail = (toEmail, order) => {
  const mailOptions = {
    from: `"SELLSOME" <${process.env.EMAIL_USER}>`,
    to: "Cuong2003pto@gmail.com",
    subject: "Thông báo đơn hàng đã giao",
    html: `
      <p>Xin chào ${order.name},</p>
      <p>Đơn hàng của bạn với mã <strong>${order._id}</strong> đã được giao thành công.</p>
      <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Lỗi khi gửi email:", error);
    } else {
      console.log("Email đã được gửi:", info.response);
    }
  });
};

module.exports = {
  sendOrderDeliveredEmail,
};

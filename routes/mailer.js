import express from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';

router.post('/', async (req, res) => {
  const output = `
    <p>You have a new product quatation enquiry</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.first_name} ${req.body.last_name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Name: ${req.body.company}</li>
        <li>Product: ${req.body.product}</li>
        <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message: </h3>
    <p>${req.body.message}</p>
    `;

  let transporter = nodemailer.createTransport({
    host: 'mail.fiberfoxtrading.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mail = {
    from: `"Fiberfox Trading Contact" <info@fiberfoxtrading.com>`,
    to: 'info@fiberfoxtrading.com',
    subject: 'Fiberfox Trading Qutation enquiry',
    text: 'Hello World?',
    html: output,
  };

  await transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        status: 'fail',
      });
    } else {
      res.json({
        status: 'success',
      });
    }
  });
});

export default router;

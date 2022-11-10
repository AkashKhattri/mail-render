import axios from 'axios';
import express from 'express';
const router = express.Router();
import nodemailer from 'nodemailer';

router.post('/', async (req, res) => {
  const { fullname, email, company, message, token } = req.body;

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.VERIFY_SECRET_KEY}&response=${token}`
  );

  //check response status and send back to the client-side
  if (response.data.success) {
    const output = `
    <p>You have a new contact us enquiry</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${fullname}</li>
        <li>Email: ${email}</li>
        <li>Company: ${company}</li>
    </ul>
    <h3>Message: </h3>
    <p>${message}</p>
    `;

    const clientOutput = `
    <h3>Thank you</h3>
    <p>Thank you ${fullname}, One of our representative will contact you soon. </p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.ionos.com',
      port: 465,
      secure: true,
      auth: {
        user: 'test@backend.kibog.com',
        pass: 'Buddha.admin123!',
      },
    });

    let mail = {
      from: `"Hamilton Contact"<hamiltondeca@hotmail.com>`,
      to: 'hamiltondeca@hotmail.com',
      subject: 'Hamilton Contact Us Info Mail',
      text: 'Hello World?',
      html: output,
    };

    let clientMail = {
      from: `"Hamilton DECA" <hamiltondeca@hotmail.com>`,
      to: `${email}`,
      subject: 'Hamilton DECA Contact reply',
      text: 'Hello World?',
      html: clientOutput,
    };

    await transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log('fail');
      } else {
        console.log('success');
      }
    });

    await transporter.sendMail(clientMail, (err, data) => {
      if (err) {
        res.json({
          err: err,
          status: 'fail',
        });
      } else {
        res.json({
          status: 'success',
        });
      }
    });
  } else {
    res.send('Robot');
  }
});

router.post('/memebership', async (req, res) => {
  const {
    fullname,
    company,
    companyAddress,
    email,
    city,
    phone,
    fax,
    applicationNumber,
    lisenceNumber,
    startingDate,
    token,
  } = req.body;

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.VERIFY_SECRET_KEY}&response=${token}`
  );

  //check response status and send back to the client-side
  if (response.data.success) {
    const output = `
    <p>You have a new membership enquiry</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${fullname}</li>
        <li>Company: ${company}</li>
        <li>Email: ${email}</li>
        <li>Company Address: ${companyAddress}</li>
        <li>City/Postal Code: ${city}</li>
        <li>Phone: ${phone}</li>
        <li>Fax: ${fax}</li>
        <li>Master's Application Number: ${applicationNumber}</li>
        <li>Contractor's Lisence Number: ${lisenceNumber}</li>
        <li>Company Starting Date: ${startingDate}</li>
    </ul>
    `;

    const clientOutput = `
    <h3>Thank you</h3>
    <p>Thank you ${fullname}, One of our representative will contact you soon. </p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.ionos.com',
      port: 465,
      secure: true,
      auth: {
        user: 'test@backend.kibog.com',
        pass: 'Buddha.admin123!',
      },
    });

    let mail = {
      from: `"Hamilton Membership Info" <hamiltondeca@hotmail.com>`,
      to: 'hamiltondeca@hotmail.com',
      subject: 'Hamilton Membership Info Mail',
      text: 'Hello World?',
      html: output,
    };
    let clientMail = {
      from: `"Hamilton DECA" <hamiltondeca@hotmail.com>`,
      to: `${email}`,
      subject: 'Hamilton DECA Membership reply',
      text: 'Hello World?',
      html: clientOutput,
    };

    await transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log('fail');
      } else {
        console.log('success');
      }
    });
    await transporter.sendMail(clientMail, (err, data) => {
      if (err) {
        res.json({
          err: err,
          status: 'fail',
        });
      } else {
        res.json({
          status: 'success',
        });
      }
    });
  } else {
    res.send('Robot');
  }
});

export default router;

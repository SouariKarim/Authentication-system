const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, emailBody) => {
  var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: `${process.env.SENDER_EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  var mailOptions = {
    from: `${process.env.SENDER_EMAIL}`,
    to: email,
    subject: subject,
    text: emailBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  console.log('the email is sent');
};

module.exports = sendEmail;

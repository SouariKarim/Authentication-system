const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const sendEmail = require('../sendEmail');

const router = express.Router();

const { sequelize, Inscription, User } = require('../models');

// find user by email methos.
async function findUserByUsername(model, username) {
  try {
    users = await model.findAll({ where: { username: username } });
    return users instanceof Array ? users[0] : null;
  } catch (ex) {
    throw ex;
  }
}

// login router
router.post('/login', async (req, res) => {
  console.log(req.body);

  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
        message: 'Please provide username/email and password.',
      });
    }

    let user;

    if (req.body.username) {
      user = await findUserByUsername(User, req.body.username);

      // user = await User.findOne({ where: { username: username } });
    }

    if (user == null) {
      res.status(403).send({
        message: 'Invalid Credentials !',
      });
    }

    console.log(user.dataValues); // { id: 1, username: 'karim', password: 'karim' }

    const payload = {
      user: {
        id: user.dataValues.id,
      },
    };

    jwt.sign(payload, 'jwtSecret', { expiresIn: '30days' }, (err, token) => {
      if (err) throw err;

      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('server error !!');
  }
});

router.post('/validationEmail/:name', auth, async (req, res, next) => {
  const name = req.params.name;

  // the admin id
  // console.log(req.user.id);

  try {
    users = await Inscription.findAll({ where: { name: name } });
    users = users instanceof Array ? users[0] : null;

    if (users.validated) {
      return res.json({ msg: 'the user is already validated' });
    }
    await users.update({ validated: true });

    // email params
    const subject = 'This is a validation email ';
    const emailBody =
      'Hello , the admins of the platform validated your request !!!';

    await sendEmail(users.email, subject, emailBody);
    res.json({ msg: 'the validation email has been sent' });

    // await Inscription.update({ validated: true }, { where: { email: email } });
  } catch (err) {
    console.log('server error !!!');
    res.status(500).send('Server Error');
  }
});

router.post('/generateToken/:name', auth, async (req, res) => {
  const name = req.params.name;

  console.log(req.user.id);

  try {
    users = await Inscription.findAll({ where: { name: name } });
    users = users instanceof Array ? users[0] : null;

    if (!users.validated) {
      return res.json({
        msg: 'the user must be validated by the admin to get the token',
      });
    }

    const token = jwt.sign({ id: req.user.id }, 'jwtSecret', { expiresIn: 60 });

    let diffMins;

    if (users.validation_date !== null) {
      const date = new Date();
      const validationDate = new Date(users.validation_date);

      const diffTime = Math.abs(date - validationDate);
      diffMins = Math.round(((diffTime % 86400000) % 3600000) / 60000);

      console.log('the diff is ', diffMins);

      if (diffMins <= 1) {
        // email params
        const subject = 'This is a generate token email ';
        const emailBody = `Hello , a generated token was sent for you . this is you generated token sent before the expiration date ===================> ${token} `;
        console.log('the token is resent and the time is less');

        await sendEmail(users.email, subject, emailBody);
        await users.update({ bearer_token: token });
        await users.update({ validation_date: sequelize.fn('NOW') });
        res.send({
          msg: 'the token was sent and the expiration date is still valid    , sent before the expiration date !!',
          token,
        });
      } else if (diffMins > 1) {
        const token = jwt.sign({ id: req.user.id }, 'jwtSecret', {
          expiresIn: 60,
        });

        // email params
        const subject = 'This is a generrate token email ';
        const emailBody = `Hello , a generated token was sent for you . this is your generated token sent after the expiration date ===================> ${token} `;
        console.log(
          'the token is resent and the time is over and a new token was sent'
        );

        await sendEmail(users.email, subject, emailBody);
        await users.update({ bearer_token: token });
        await users.update({ validation_date: sequelize.fn('NOW') });

        res.send({
          msg: 'The token was sent and the expiration date is passed ( sent after the expiration date ) !!!',
          token,
        });
      }
      console.log(diffMins);
    } else {
      await users.update({ bearer_token: token });
      await users.update({ validation_date: sequelize.fn('NOW') });

      // email params
      const subject = 'This is a generrate token email ';
      const emailBody = `Hello , a generated token was sent for you . this is you generated token ===================> ${token} `;

      await sendEmail(users.email, subject, emailBody);
      res.send({
        msg: 'A generated token was sent for the first time !!',
        token,
      });
    }
  } catch (err) {
    console.log('server error !!!');
    res.status(500).send('Server Error');
  }
});

module.exports = router;

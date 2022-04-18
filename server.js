const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { sequelize, Inscription, User } = require('./models');
const authentication = require('./routes/authentication');

const app = express();

app.use(cors());

const date = new Date();

console.log(date);

app.use(express.json());

app.use('/', authentication);

app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000');
  // await sequelize.sync({ force: true });

  await sequelize.authenticate();
  console.log('Database Connected!');
});

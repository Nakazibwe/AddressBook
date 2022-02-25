/* eslint-disable import/extensions */
/* eslint-disable no-console */
const express = require('express');

const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 5000;

// Requiring the dotenv
require('dotenv').config();

// Creating the mongoose connection.
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection currently open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


// Middleware.
app.use(express.json());

// Requiring routes.
const addressBookRoutes = require('./routes/addressbook.routes');

// Routes.
app.use('/', addressBookRoutes);

// Port
app.listen(port, () => {
  console.log(`App running on.. http://localhost:${port}`);
});

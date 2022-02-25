/* eslint-disable import/extensions */
/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

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

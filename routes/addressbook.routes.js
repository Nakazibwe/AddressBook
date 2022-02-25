const express = require('express');

const router = express.Router();
const addressBookControl = require('../controllers/address.controller');

// Route to get all addresses.
router.get('/addresses', addressBookControl.getAddresses);
// Route to post addresses.
router.post('/addresses', addressBookControl.postAddresses);

module.exports = router;

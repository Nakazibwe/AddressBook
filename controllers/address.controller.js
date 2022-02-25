/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-throw-literal */
/* eslint-disable no-empty */
// Requiring database.
const database = require('../addressbook.database');

// Get all addresses
exports.getAddresses = async (req, res) => {
  try {
    const availableAddresses = database;
    if (!availableAddresses) { throw 'No addresses available'; }
    res.json(availableAddresses);
  } catch (error) {
    if (error == 'No addresses available') {
      return res.status(404).json({ error });
    }
    return res.status(400).json({ error });
  }
};

// Post an address
exports.postAddresses = async (req, res) => {
  const {
    id, firstname, lastname, phonenumber,
  } = req.body;
  try {
    database.forEach((address) => {
      if (address.id == id) {
        throw 'Duplicate ID Entered';
      }
    });
    database.push({
      id, firstname, lastname, phonenumber,
    });
    res.status(201).json({
      id, firstname, lastname, phonenumber,
    });
  } catch (error) {
    if (error == 'Duplicate ID Entered') {
      return res.status(400).json({ error });
    }
    return res.status(400).json({ error });
  }
};

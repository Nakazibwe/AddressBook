/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-throw-literal */
/* eslint-disable no-empty */
// Requiring database.

const AddressBook = require('../models/addressbook.model');

// Get all addresses
exports.getAddresses = async (req, res) => {
  try {
    const availableAddresses = await AddressBook.find();
    if (!availableAddresses) { throw 'No Registered Address Available'; }
    res.status(200).json(availableAddresses);
  } catch (error) {
    if (error == 'No Registered Address Available') {
      return res.status(404).json({ error });
    }
    return res.status(400).json({ error });
  }
};

// Post an address
exports.postAddresses = async (req, res) => {
  const {
    firstname, lastname, phonenumber,
  } = req.body;
  try {
    const duplicate = await AddressBook.findOne({ phonenumber });
    if (duplicate) { throw 'Telephone number entered already belongs to a registered user'; }
    const newUser = await AddressBook.create({ firstname, lastname, phonenumber });
    if (!newUser) { throw 'Registration Failed'; }
    res.status(201).json(newUser);
  } catch (error) {
    if (error == 'Telephone number entered already belongs to a registered user') {
      return res.status(400).json({ error });
    } if (error == 'Registration Failed') {
      return res.status(409).json({ error });
    }
    return res.status(400).json({ error });
  }
  
};

const mongoose = require('mongoose');

const addressBookSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  phonenumber: {
    type: Number,
    trim: true,
    required: true,
    unique: true,
  },

});

// Exporting the model.
module.exports = mongoose.model('AddressBook', addressBookSchema);

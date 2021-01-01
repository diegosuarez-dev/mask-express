const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
});

module.exports = AddressSchema;

const mongoose = require('mongoose');

const domitoriesSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: '',
    },
    first_name: {
      type: String,
      default: '',
    },
    last_name: {
      type: String,
      default: '',
    },
    checkin_date: {
      type: String,
      default: '',
    },
    checkout_date: {
      type: String,
      default: '',
    },
    adult_number: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const Domitories = mongoose.model('Domitories', domitoriesSchema);

module.exports = { Domitories };

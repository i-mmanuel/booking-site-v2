const mongoose = require('mongoose');

const wiseAsSerpentsSchema = new mongoose.Schema(
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
    },
    phone: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const wiseAsSerpents = mongoose.model('Wise-As-Serpents', wiseAsSerpentsSchema);
module.exports = { wiseAsSerpents };

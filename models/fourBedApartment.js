const mongoose = require('mongoose');

const fourBedApartmentSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  checkin_date: {
    type: String,
  },
  checkout_date: {
    type: String,
  },
  adult_number: {
    type: String,
  },
});

const fourBedApartment = mongoose.model(
  '4-Bedroom-Apartment',
  fourBedApartmentSchema
);
module.exports = { fourBedApartment };

const mongoose = require('mongoose');
require('../models/goodGenerals');
require('../models/fourBedApartment');
const goodGeneralBooking = mongoose.model('Good-generals');
const fourBedApartment = mongoose.model('4-Bedroom-Apartment');

module.exports = {
  mongoURI:
    'mongodb+srv://edem:passwordpasswordpassword@bookings.hgp1d.mongodb.net/bookings?retryWrites=true&w=majority',
  mongoConnect: () => {
    mongoose.connect(
      'mongodb+srv://edem:passwordpasswordpassword@bookings.hgp1d.mongodb.net/bookings?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
    mongoose.connection.on('connected', () => {
      console.log('Connected to Mongo instance.');
    });
    mongoose.connection.on('error', (error) => {
      console.log('Error connecting to Mongo instance', error);
    });
  },

  roomTypes: {
    'Good-generals': goodGeneralBooking,
    '4-bedroom-apartment': fourBedApartment,
  },

  isDateAvailable: async (
    model,
    checkin_date,
    checkout_date,
    maxNumberOfRooms
  ) => {
    let checkins = await model.find({
      checkin_date,
    });
    let checkouts = await model.find({
      checkout_date,
    });
    let obj = {};

    const datesBelowCheckOutDate = checkouts.filter(
      (date) => date.checkout_date >= checkin_date
    );

    // console.log(datesBelowCheckOutDate);

    if (checkins.length === maxNumberOfRooms) {
      return {
        ...obj,
        message: 'All rooms booked for that day',
        isAvailable: false,
      };
    }

    if (datesBelowCheckOutDate.length >= maxNumberOfRooms) {
      return {
        ...obj,
        message: `There are no rooms available for ${datesBelowCheckOutDate.length} days`,
        isAvailable: false,
      };
    }

    return { ...obj, message: 'There is room for you.', isAvailable: true };
    // Check how many rooms are booked within the checkin date and checkout date.

    // Check if checkin date is less than all checkout dates. If checkin date is less than
    // check out date and the number of those rooms is equal to number of rooms, then it's booked
  },
};

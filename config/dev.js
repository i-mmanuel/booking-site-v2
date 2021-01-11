const mongoose = require('mongoose');

require('../models/goodGenerals');
require('../models/fourBedApartment');
require('../models/domitories');
require('../models/wiseAsSerpents');
require('../models/hotelStyle');
require('../models/numberOfRooms');

const goodGeneral = mongoose.model('Good-generals');
const fourBedroomApartment = mongoose.model('4-Bedroom-Apartment');
const wiseAsSerpent = mongoose.model('Wise-As-Serpents');
const hotelStyles = mongoose.model('Hotel-Style');
const domitores = mongoose.model('Domitories');
const roomNumber = mongoose.model('Number-Of-Rooms');

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
    'Good-generals': goodGeneral,
    '4-bedroom-apartment': fourBedroomApartment,
    'Wise-as-serpents': wiseAsSerpent,
    Domitories: domitores,
    'Hotel-style': hotelStyles,
  },

  returnRoomNumber: async (room) => {
    let num = await roomNumber.findById('5ffb594ccacf02432d066a47');

    switch (room) {
      case 'Good-generals':
        return num.goodGenerals;
      case 'Hotel-style':
        return num.hotelStyle;
      case 'Wise-as-serpents':
        return num.wiseAsSerpents;
      case '4-bedroom-apartment':
        return num.fourBedApartment;
      case 'Domitories':
        return num.domitories;
      default:
        break;
    }
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
        message: `There are no rooms available for some days`,
        isAvailable: false,
      };
    }

    return { ...obj, message: 'There is room for you.', isAvailable: true };
    // Check how many rooms are booked within the checkin date and checkout date.

    // Check if checkin date is less than all checkout dates. If checkin date is less than
    // check out date and the number of those rooms is equal to number of rooms, then it's booked
  },
};

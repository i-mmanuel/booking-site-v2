const mongoose = require('mongoose');

const numberOfRoomsSchema = new mongoose.Schema(
  {
    goodGenerals: {
      type: Number,
    },
    fourBedApartment: {
      type: Number,
    },
    hotelStyle: {
      type: Number,
    },
    wiseAsSerpents: {
      type: Number,
    },
    domitories: {
      type: Number,
    },
  },
  { timestamps: true }
);

const numberOfRooms = mongoose.model('Number-Of-Rooms', numberOfRoomsSchema);

module.exports = { numberOfRooms };

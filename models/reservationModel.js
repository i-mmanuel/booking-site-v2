const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: Number,
  },
  checkin_date: {
    type: String,
    required: true,
  },
  checkout_date: {
    type: String,
    required: true,
  },
  room_type: {
    type: String,
  },
  adult_number: {
    type: Number,
    default: 1,
  },
});

mongoose.model('booking', reservationSchema);

// Is the 12th booked?

// const checkDate = (roomType, checkin_date, checkout_date) => {
//   if (checkin_date === booked_checkin_date) {
//     //already booked
//   } else if (
//     checkin_date > booked_checkin_date &&
//     checkin_date < booked_checkout_date
//   ) {
//     // already booked too
//   } else if (checkin_date_12 > booked_checkout_date_11) {
//     // new booking can be made
//   } else if (checkin_date === booked_checkout_date) {
//     //there is no booking
//   } else if (checkout_date <= booked_checkin_date) {
//     //there in't a booking
//   } else if (checkout_date)
// };
// 1. How to check for room types?
// 2. Does this work with multiple rooms?

// start date shiould be before existing start or after end date
// && end date range (before start date || after end date) == booking works
// If it's before the existing start date and not after the existing end date == already a booking

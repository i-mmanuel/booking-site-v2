const Express = require('express');
const Router = Express.Router();
const { dateToday } = require('../../config/dev');
const { roomTypes } = require('../../config/dev');

const renderOptions = {
  minDate: dateToday,
  message: '',
  error: '',
};

// Handle room request.
Router.post('/room-booking', async (request, response) => {
  const {
    first_name,
    last_name,
    room_type,
    adult_number,
    checkin_date,
    checkout_date,
    email,
    phone,
  } = request.body;

  console.log(`Submitted booking:`, request.body);

  // Validate inputs.
  if (!first_name || !last_name || !phone || !email) {
    return response
      .status(422)
      .send({ bookingError: 'Please check the form inputs' });
  }

  // Create new booking for good generals.

  try {
    let room = new roomTypes[room_type]({
      email,
      phone,
      checkin_date,
      checkout_date,
      adult_number,
      room_type,
      first_name,
      last_name,
    });

    await room.save();
    response.send({
      ...renderOptions,
      bookingMessage: 'There is hope for thee',
    });
  } catch (error) {
    return response
      .status(422)
      .send({ ...renderOptions, bookingError: error.message });
  }

  //Return and render page.
  // return response.render('index', {
  //   ...renderOptions,
  //   bookingMessage: 'Your booking is complete!',
  // });
});

module.exports = Router;

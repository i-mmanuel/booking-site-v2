const Express = require('express');
const Router = Express.Router();
const { roomTypes } = require('../../config/dev');

// Handle room request.
Router.post('/api/room-booking', async (request, response) => {
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

  console.log(roomTypes);

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
      bookingMessage:
        'Your room has been booked! You will receive an email from us soon.',
    });
  } catch (error) {
    return response.status(422).send({ bookingError: error.message });
  }

  //Return and render page.
  // return response.render('index', {
  //   ...renderOptions,
  //   bookingMessage: 'Your booking is complete!',
  // });
});

module.exports = Router;

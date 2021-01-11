const Express = require('express');
const Router = Express.Router();
const { roomTypes } = require('../../config/dev');
const { mailer } = require('../../config/mailer');

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
      ...request.body,
      bookingMessage:
        'Your room has been booked! You will receive an email from us soon.',
    });

    const email_body = `<h1>Thanks for booking with us, ${first_name}.
    <p>Here are your booking details:</p>
    <br/>
    <ul>
    <li>Checkin date: ${checkin_date}</li>
    <li>Checkout date: ${checkout_date}</li>
    <li>Number of rooms: ${adult_number}</li>
    <li>Kind of room booked: ${room_type}</li>
    </ul>
    <br />
    <p>Call 07453090995 should you have any questions:
    `;

    // Send email.
    mailer(first_name, email, email_body);
  } catch (error) {
    return response.status(422).send({ bookingError: error.message });
  }

  // //Return and render page.
  // // return response.render('index', {
  // //   ...renderOptions,
  // //   bookingMessage: 'Your booking is complete!',
  // // });
});

module.exports = Router;

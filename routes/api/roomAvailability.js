const Express = require('express');
const Router = Express.Router();
const { isDateAvailable } = require('../../config/dev');
const { roomTypes, returnRoomNumber } = require('../../config/dev');

// Handle room request.
Router.post('/api/room-availability', async (request, response) => {
  const { room_type, checkin_date, checkout_date, adult_number } = request.body;

  // Validate inputs.
  if (!checkin_date || !checkout_date || !adult_number || !room_type) {
    return response.status(422).send({ error: 'Please check form' });
  }

  if (checkin_date >= checkout_date) {
    return response
      .status(400)
      .send({ error: 'Please make sure you book a date after checkin date' });
  }

  // Check availability.
  const availableResponse = await isDateAvailable(
    roomTypes[room_type],
    checkin_date,
    checkout_date,
    await returnRoomNumber(room_type)
  );

  if (availableResponse.isAvailable) {
    //Return and render page.
    return response.send({
      ...availableResponse,
      checkin_date: checkin_date || minDate,
      checkout_date: checkout_date || '',
      room_type,
      adult_number,
    });
  } else {
    return response.status(401).send({ error: availableResponse.message });
  }
});

module.exports = Router;

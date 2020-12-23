const Express = require('express');
const Router = Express.Router();
const { dateToday } = require('../../config/dev');
const { isDateAvailable } = require('../../config/dev');
const { roomTypes } = require('../../config/dev');

const renderOptions = {
  minDate: dateToday,
};

// Handle room request.
Router.post('/room-availability', async (request, response) => {
  const { room_type, checkin_date, checkout_date, adult_number } = request.body;

  console.log(`Submitted availability: `, request.body);

  // Validate inputs.
  if (!checkin_date || !checkout_date || !adult_number || !room_type) {
    return response.status(422).send({ error: 'Please check form' });
  }

  let availableMessage = await isDateAvailable(
    roomTypes[room_type],
    checkin_date,
    checkout_date,
    3
  );

  //Return and render page.
  return response.send({
    ...renderOptions,
    ...availableMessage,
    checkin_date: checkin_date || '',
    checkout_date: checkout_date || '',
    room_type: room_type,
  });
});

module.exports = Router;

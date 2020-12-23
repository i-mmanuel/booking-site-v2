const Express = require('express');
const Router = Express.Router();
const mongoose = require('mongoose');
const { mongoURI } = require('../../config/dev');

require('../../models/reservationModel');

// MongoDB connect
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo instance.');
});
mongoose.connection.on('error', (error) => {
  console.log('Error connecting to Mongo instance', error);
});

Router.post('/api/booking', (request, response) => {
  const { room_type, checkin_date, checkout_date, adult_number } = request.body;

  console.log(request.body);

  if (!checkin_date || !checkout_date || !adult_number || !room_type) {
    return response
      .status(422)
      .render('index', { message: 'Please check the form again' });
  }

  return response.render('index', { message: 'There is room for you.' });
});

module.exports = Router;

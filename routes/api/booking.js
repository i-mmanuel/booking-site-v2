const Express = require('express');
const Router = Express.Router();

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

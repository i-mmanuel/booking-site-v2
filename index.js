const Express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const booking = require('./routes/api/booking');
const roomBooking = require('./routes/rooms/roomBooking');
const roomAvailability = require('./routes/rooms/roomAvailability');

const app = Express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

app.get('/', (request, response) =>
  response.render('index', {
    minDate: `${yyyy}-${mm}-${dd}`,
  })
);

app.use(Express.static(path.join(__dirname, 'public')));

// Set api booking
// app.use(booking);
app.use(roomBooking);
app.use(roomAvailability);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

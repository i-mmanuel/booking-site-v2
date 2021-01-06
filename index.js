const Express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const { mongoURI } = require('./config/dev');
const roomBooking = require('./routes/api/roomBooking');
const roomAvailability = require('./routes/api/roomAvailability');
const app = Express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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

// AdminBro setup
const adminBro = require('./admin');
const router = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Get today's date for form input.
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

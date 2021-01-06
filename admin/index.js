const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
AdminBro.registerAdapter(AdminBroMongoose);

// require('express-session');

const { Domitories } = require('../models/domitories');
const { fourBedApartment } = require('../models/fourBedApartment');
const { hotelStyle } = require('../models/hotelStyle');
const { goodGenerals } = require('../models/goodGenerals');
const { wiseAsSerpents } = require('../models/wiseAsSerpents');

const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    Domitories,
    fourBedApartment,
    hotelStyle,
    goodGenerals,
    wiseAsSerpents,
  ],
  branding: {
    companyName: 'Booking Admin',
    softwareBrothers: false,
  },
});
module.exports = adminBro;

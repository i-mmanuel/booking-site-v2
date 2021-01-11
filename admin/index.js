const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
AdminBro.registerAdapter(AdminBroMongoose);

// require('express-session');

const { domitories } = require('../models/domitories');
const { fourBedApartment } = require('../models/fourBedApartment');
const { hotelStyle } = require('../models/hotelStyle');
const { goodGenerals } = require('../models/goodGenerals');
const { wiseAsSerpents } = require('../models/wiseAsSerpents');
const { numberOfRooms } = require('../models/numberOfRooms');

const adminBro = new AdminBro({
  rootPath: '/admin-page',
  resources: [
    domitories,
    fourBedApartment,
    hotelStyle,
    goodGenerals,
    wiseAsSerpents,
    numberOfRooms,
  ],
  branding: {
    companyName: 'Anagkazo Admin',
    softwareBrothers: false,
    logo: false,
  },
});

module.exports = adminBro;

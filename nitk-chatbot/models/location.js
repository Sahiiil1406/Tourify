const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true
    },
    locationType: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    openTime: {
        type: String, // You can also use Date type if you need to store specific date-time
        required: true
    },
    closeTime: {
        type: String, // You can also use Date type if you need to store specific date-time
        required: true
    }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
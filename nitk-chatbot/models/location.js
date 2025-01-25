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
        type: String, // Consider changing to a specific time format if required
        required: true
    },
    closeTime: {
        type: String, // Consider changing to a specific time format if required
        required: true
    },
    coordinates: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    reviews: [
        {
            user: { type: String },
            comment: { type: String },
            rating: { type: Number, min: 0, max: 5 }
        },
    ]
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;

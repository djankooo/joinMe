const mongoose = require('mongoose');

const Schema = mongoose.Schema

const driverSchema = new Schema({
    driverName: {
        type: String,
        required: true
    },
    driverCar: {
        type: String,
        required: true
    },
    pricePerKm: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Driver', driverSchema);

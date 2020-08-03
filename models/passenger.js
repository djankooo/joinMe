const mongoose = require('mongoose');

const Schema = mongoose.Schema

const passengerSchema = new Schema({
    passengerName: {
        type: String,
        required: true
    },
    passengerBalance: {
        type: Number,
        required: true
    },
    createdRides: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ride'
        }
    ]
});

module.exports = mongoose.model('Passenger', passengerSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const Status = Object.freeze({
    Ordered: 'ordered',
    Confirmed: 'confirmed',
    PickedUp: 'pickedUp',
    Finished: 'finished',
});

const rideSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Passenger'
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver'
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: 'ordered'
    }
});

module.exports = mongoose.model('Ride', rideSchema);

const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@joinmeapp.9jcpi.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const connectToMongoDb = () => mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = {
    connectToMongoDb,
}

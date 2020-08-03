require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const {getRandomId} = require("./utils/generators");
const graphqlHttp = require('express-graphql').graphqlHTTP;
const {buildSchema} = require('graphql');
const {connectToMongoDb} = require('./services/mongoDbService');

const Driver = require('./models/drivers')
const Passenger = require('./models/passenger')
const Ride = require('./models/ride')

const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHttp({
        schema: buildSchema(`
        type Ride {
            _id: ID!
            driver: Driver
            passenger: Passenger!
        }
        
        input RideInput {
            driver: DriverInput
            passenger: RideInput
        }
            
        type Driver {
            _id: ID!
            driverName: String!
            driverCar: String!
            pricePerKm: Int!
        }
        
        input DriverInput {
            driverName: String!
            driverCar: String!
            pricePerKm: Int!
        }
        
        type Passenger {
            _id: ID!
            passengerName: String!
            passengerBalance: Int!
        }
        
        input PassengerInput {
            passengerName: String!
            passengerBalance: Int!
        }
        
        type RootQuery {
            rides: [Ride!]!
            drivers: [Driver!]!
            passengers: [Passenger!]!
        }
        
        type RootMutation {
            createRide(rideInput: RideInput): Ride
            createDriver(driverInput: DriverInput): Driver
            createPassenger(passengerInput: PassengerInput): Passenger
        }
        
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
        rootValue: {
            rides: () => Ride.find(),
            drivers: () => Driver.find(),
            passengers: () => Passenger.find(),
            createDriver: (args) => {
                const driver = new Driver({
                    driverName: args.driverInput.driverName,
                    driverCar: args.driverInput.driverCar,
                    pricePerKm: args.driverInput.pricePerKm
                });
                return driver
                    .save()
                    .then(result => {
                        console.log(result);
                        return {...result._doc};
                    })
                    .catch(error => {
                        console.error(error);
                        throw error;
                    })
            },
            createPassenger: (args) => {
                const passenger = new Passenger({
                    passengerName: args.passengerInput.passengerName,
                    passengerBalance: args.passengerInput.passengerBalance
                });
                return passenger
                    .save()
                    .then(result => {
                        console.log(result);
                        return {...result._doc};
                    })
                    .catch(error => {
                        console.error(error);
                        throw error;
                    })
            },
            createRide: (args) => {
                const ride = new Ride({
                    _id: getRandomId(),
                    driver: args.rideInput.passenger,
                    passenger: args.rideInput.passenger,
                });
                return ride
                    .save()
                    .then(result => {
                        console.log(result);
                        return {...result._doc};
                    })
                    .catch(error => {
                        console.error(error);
                        throw error;
                    })
            }
        },
        graphiql: true
    })
);

connectToMongoDb()
    .then(() => {
            app.listen(process.env.PORT);
            console.log(`App started on port ${process.env.PORT}!`);
            console.log('Connection to MongoDB established!');
        }
    )
    .catch((error) => console.log(error));



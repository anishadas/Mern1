const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

mongoose.connect(process.env.CONNECTION_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'errror connecting to db'));
db.once('open', () => console.log("connected to database"));
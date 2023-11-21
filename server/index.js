const express = require('express');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/auth');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');
const cookieSession = require('cookie-session');
const MongoStore = require('connect-mongo');
require('./config/mongoose');

// initialize
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
    name: "session",
    keys: ["anisha"],
    maxAge: 24 * 60 * 60 * 100,
}));

const cookieExpirationDate = new Date();
const cookieExpirationDays = 365;
cookieExpirationDate.setDate(cookieExpirationDate.getDate() + cookieExpirationDays);
app.use(session({
    name: 'MyDrive',
    secret: 'drivecookie',
    saveUninitialized: true,
    resave: true,
    cookie: { secure: false }
}));
app.use(cookieParser('drivecookie'));


app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
}));

dotenv.config();




// app.use(cookieParser('drivecookie'));
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.setAuthenticatedUser);



app.use('/posts', postRoutes);
app.use('/auth', userRoutes);





// console.log(process.env.CONNECTION_URL)
// const CONNECTION_URL = 'mongodb+srv://Memories:hellbound10@cluster0.d3ekvmd.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
    if (err) {
        console.log(`error in running server: ${err}`);
    }
    console.log(`server is running on port ${PORT}`);
})

// mongoose.set('useFindAndModify',false);

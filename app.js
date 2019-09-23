const express = require('express');
const authRoutes = require('./Routes/oauth-routes');
const profileRoutes = require('./Routes/profile-routes');
const passportSetup = require('./Utils/passport-utils');
const cookieSession = require('cookie-session');
const passport = require('passport')


const app = express()

app.set('view engine', 'ejs')

// set the cookies to be used 
app.use(cookieSession({
    maxAge : 24 * 60 * 60 * 1000,
    keys : ['my_secret_session_key']
}))

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log('app start to liten on port : 3000')
})
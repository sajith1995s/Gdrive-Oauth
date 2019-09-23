const passport = require('passport');
const GoogleOauth = require('passport-google-oauth20');
const properties = require('./properties');


passport.serializeUser((user, done) => {
    //initialize the user session
    let userSesion ={
        id : user.id,
        token : user.token,
        name : user.name,
        email : user.email,
        profilePicture : user.profilePicture
    }

    done(null, userSesion)
});


passport.deserializeUser((userSesion, done)  => {
    done(null, userSesion)
});

passport.use(

    //google oAuth
    new GoogleOauth({

        // goole client application properties
        callbackURL:'/auth/google/redirect',
        clientID: properties.googleProperties.clientID,
        clientSecret: properties.googleProperties.clientSecret

    }, (accessToken, refreshToken, profile, done) => {
 
        console.log('passport call back function ')
        console.log(profile)
        console.log("---------------------------------------")
        console.log('Access Token :' + accessToken)
        console.log("---------------------------------------")

        user = {
            "token" : accessToken,
            "id" : profile.id,
            "name" : profile.displayName,
            "email" : profile._json.email,
            "profilePicture" : profile._json.picture
        }

        done(null, user);
        
    })
)


'use strict';

const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')
const User = require("../models/user.model")

module.exports = function () {

    passport.use(
        new FacebookTokenStrategy( {
            clientID: '108342049813093',
            clientSecret: '7fecb8413e8f37ef25a708f4019b9737'
        },
        (accessToken, refreshToken, profile, done) => {
            let user = new User()

            user.userExist( { 'facebookProvider.id': profile.id }, (err, user) => {
                if (!user) {

                  console.log('passport userExist has to createFbUser')
                  /*
                    var newUser = new User({
                      name: profile.displayName,
                      email: profile.emails[0].value,
                      photo: profile.photos[0].value,
                      facebookProvider: {
                        id: profile.id,
                        token: accessToken
                      }
                    })

                    newUser.createFbUser(function(error, savedUser) {
                        if (error) console.log('Error create Facebook user', error)
                        done(error, savedUser)
                    })
                    */
                    done(error,user)
                  } else {
                    done(err, user)
                  }
            })

        }
    ))

}

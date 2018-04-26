const bcrypt = require('bcrypt')
//const firebase = require("firebase-admin");
const User = require("../models/user.model")
const jwt = require('../modules/jwt')
//const serviceAccount = require('../config/serviceAccountFirebase.json')
const saltRounds = 10;
/*
firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://laporra-4a9d4.firebaseio.com'
});
*/

exports.signIn = (req, res) => {
    //let user = new User()

    User.userExist({ email : req.body.email }, (user, err) => {
        if (err) return res.status(500).send("ERROR_FIND_USER")
        if (!user) return res.status(401).send('SIGNIN_INVALID_CREDENTIALS')

        bcrypt.compare(req.body.password, user.password)
            .then((hashResult) => {
                if (!hashResult){
                  return res.status(401).send('SIGNIN_ERROR_PASSWORD')
                }

                console.log(`User validated: ${user.email}`)

                let newJWT = jwt.generaToken(user)
                return res.status(201).json({ user : { name : user.name, email : user.email, token : newJWT }})

            }).catch((err) => {
                console.error(err)
                return res.status(500).send("ERROR_FIND_USER")
            });
    })
}
/*
exports.signInFacebook = (req, res) => {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }

    let newJWT = jwt.generaToken(req.user)

    res.status(201).json({ user : { name : req.user.name, email : req.user.email, token : newJWT }})
}
*/
exports.create = (req, res) => {
    //let user = new User()

    User.userExist({email: req.body.email, name: req.body.name}, (user, err) => {
        if (err){
          return res.status(500).send("ERROR_FIND_USER")
        }

        if(user){
          return res.status(409).send(`ERROR_USER_EXIST`)
        }

        console.log(`ok registrando: ${req.body.email}`)

        bcrypt.hash(req.body.password, saltRounds)
            .then((hash) => {
                let newUser = {
                    name : req.body.name,
                    email : req.body.email,
                    password : hash
                }

                return User.createUser(newUser,(user,err) => {

                    if(err){
                        return res.status(500).send(err);
                    }

                    if(user){
                        console.log(user);
                        user.password = '*******'
                        return res.status(201).json(user);
                    }

                    return res.status(500).send('ERROR');

                })
            }).catch((err) => {
              return res.status(500).send(err);
            })
    })
}
/*
exports.update = (req, res) => {
    let newUser = new User(),
        userName = req.body.name

    newUser.userExist({ name: userName }, (err, user) => {
        if (err) return res.status(500).send("ERROR_FIND_USER")
        if (user) return res.status(409).send(`ERROR_USER_EXIST`)

        newUser.updateUser(req.body.user._id, { name : userName }, (err, user) => {
            user.password = '';
            res.status(201).json(user)
        })
    })
}

exports.serach = (req, res) => {
    let user = new User()

    user.findUsers(req.params.name, req.body.user._id, (err, users) => {
        if (err) return res.status(500).send("ERROR_USER_SEARCH")

        user.password = '';
        res.status(200).json(users)
    })
}
*/

const express = require("express");
const firebase = require("firebase-admin");
const functions = require('firebase-functions');
const initMiddleware = require("./src/middlewares/init.middleware")
//const validateoMiddleware = require("./src/middlewares/validator.middleware")
const serviceAccount = require('./src/config/serviceAccountFirebase.json');

const app = express();
app.disable("x-powered-by");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://one-time-password-afe47.firebaseio.com'
});
//const obj = require('./src/testjsonfile')

initMiddleware.useMiddleware(app, express)

require('./src/routes/index.routes')(app)

//validateoMiddleware.validatorMiddleware(app, express)

exports.route = functions.https.onRequest(app);

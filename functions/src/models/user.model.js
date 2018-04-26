'use strict'
const firebase = require("firebase-admin");
const _ = require('lodash');
//const serviceAccount = require('../config/serviceAccountFirebase.json')


module.exports.userExist = function({email,password}, cb) {

  const expresionRegular = /[@.,$[\]#]/;

  //".", "#", "$", "[", or "]"
  var stringArray = email.split(expresionRegular);
  var completeString =stringArray.join('');

  var usersRef = firebase.database().ref('/users/' + completeString);

  let user;
  usersRef.once('value', function (snapshot) {
    user = snapshot.val();

    if(user){
      return cb(user,null)
    }else {
      return cb(null);
    }
  })



};

module.exports.createUser = function(user, cb){

  //const expresionRegular = /[@\.\,\/\$\[\]\#]/;
  const expresionRegular = /[@.,$[\]#]/;

  var stringArray = user.email.split(expresionRegular);
  var completeString =stringArray.join('');

  var usersRef = firebase.database().ref('/users/' + completeString);

  let oldUser;
  usersRef.once('value', function (snapshot) {
    oldUser = snapshot.val();

    if(!oldUser){
      var uid = firebase.database().ref().child('users').push().key;
      user.uid = uid;
      var updates = {};
      updates['/users/' + completeString] = user;
      firebase.database().ref().update(updates);

      usersRef.once('value', function (snapshot) {
        oldUser = snapshot.val();
      })

      return cb(oldUser,null);
    }else{
      let err = {message:'user already exists'};
      return cb(null,err)
    }

  })


}
module.exports.getIdFromEmail = function(userEmail,cb){
  firebase.database().ref().child('users').orderByChild('email').equalTo(userEmail).once("value", function(snapshot) {
    console.log(snapshot.val());
    let user = snapshot.val();

    if(user){
      let resp = _.values(user)[0].uid
      return cb(resp)
    }else {
      return cb(null);
    }
  });
}

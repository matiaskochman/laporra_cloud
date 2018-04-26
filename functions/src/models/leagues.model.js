'use strict'
const _ = require('lodash')

const firebase = require("firebase-admin");

module.exports.leagueWithPasswordExist =  (leagueName, leaguePassword, cb) => {

  firebase.database().ref().child('leagues')
    .orderByChild('leagueName')
    .equalTo(leagueName)
    .once("value", function (snapshot) {

      let league = snapshot.val();

      if (!league) {
        return cb(null, null);
      }

      //let objValue = Object.values(league)[0];
      let objValue = _.values(league)[0];

      if (objValue) {
        if (objValue.password === leaguePassword) {

          return cb(league, null)
        }
      } else {
        return cb(null, null);
      }
    });

}

module.exports.leagueExist = (league, cb) => {

  firebase.database().ref().child('leagues').orderByChild('leagueName')
    .equalTo(league.name).once("value", function (snapshot) {
      console.log(snapshot.val());
      let league = snapshot.val();

      if (league) {
        return cb(league, null)
      } else {
        return cb(null, null);
      }
    });

}

module.exports.createLeague = (leagueObj, cb) => {

  const expresionRegular = /[@.,$[\]#]/;

  let tempString = leagueObj.name.replace(/\s/g, '_');
  var stringArray = tempString.split(expresionRegular);
  var completeString = stringArray.join('');

  var uid = firebase.database().ref().child('leagues').push().key;

  let leagueCode = {
    //leagueCode:completeString,
    leagueName: leagueObj.name,
    private: leagueObj.private,
    password: leagueObj.password,
    owner_user_id: leagueObj.owner,
    members: [],
    leagueId: uid
  }

  var updates = {};
  updates['/leagues/' + uid] = leagueCode;
  firebase.database().ref().update(updates);

  var league;

  var leagueRef = firebase.database().ref().child('/leagues/' + uid);
  leagueRef.once('value', function (snapshot) {
    league = snapshot.val();
  })

  return cb(league, null);

};

module.exports.updateLeague = function (leagueUpdate, userId, cb) {

  var updates = {};
  updates['/leagues/' + leagueUpdate.leagueId + '/members/' + userId] = userId;

  let league_user_obj = { userId, leagueId: leagueUpdate.leagueId }
  updates['/leagues_user/' + userId + '/leagues/' + leagueUpdate.leagueId] = leagueUpdate.leagueId
  firebase.database().ref().update(updates).then(function () {

    return cb({message:'league updated'},null);
  }).catch(function (err) {
    console.log(err);
    return cb(null,{message:'error'})
  });
}

module.exports.getLeaguesFromUser = function (userId, cb) {

  var league_user_Ref = firebase.database().ref().child('/leagues_user/' + userId);

  league_user_Ref.once('value', function (snapshot) {
    let val = snapshot.val();

    if (val && val.leagues) {
      let leagueArray = Object.keys(val.leagues)
      let leagues = [];
      var promises = [];

      promises = leagueArray.map((leagueId, index) => {

        return new Promise(function (resolve, reject) {
          let val1;
          let leagueRef = firebase.database().ref().child('/leagues/' + leagueId);

          leagueRef.once('value', function (snapshot) {
            let val1 = snapshot.val();
            if (val1) {
              resolve(val1)
            } else {
              reject(val1);
            }
          })
        })
      })

      Promise.all(promises).then(values => {
        return cb(values, null)
      }).catch(function (err) {
        console.log(err);
      });

    } else {
      return cb(null, { message: 'no leagues found' })
    }
  })
}

module.exports.findLeague = function (leagueName,cb) {

  if(!leagueName){
    return cb(null,{error:'LeagueName is null'})
  }else if(_.toLower(leagueName) === 'mundial'){

    return new Promise(function (resolve, reject) {
      let val1;
      let leagueRef = firebase.database().ref().child('/jornadas/');

      leagueRef.once('value', function (snapshot) {
        let val1 = snapshot.val();
        if (val1) {
          resolve(val1)
        } else {
          reject(new Error('error'));
        }
      })
    }).then((jornadas)=>{
      return cb(jornadas,null);
    }).catch((err)=>{
      return cb(null,err)
    })
  }else{
    return cb(null,new Error('name is not mundial'))
  }

}

module.exports.isLeagueOwner = function () {
  return;
}

module.exports.isLeagueCoach = function () {
  return;
}

module.exports.isLeagueMember = function () {
  return;
}

module.exports.getLeague = function () {
  return;
}

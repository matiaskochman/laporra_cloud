'use strict'
const _ = require('lodash')

const firebase = require("firebase-admin");

module.exports.createPronostico = (nuevoPronostico, cb) => {

  if(!nuevoPronostico.owner && !nuevoPronostico.index_fecha_partido){
    return cb(null,{message:'no userId'})
  }

  let pronostico = {
    local_value:nuevoPronostico.local_value,
    visitor_value:nuevoPronostico.visitor_value
  }

  var updates = {};
  updates['/pronosticos/user/'+nuevoPronostico.owner+'/index_fecha_partido/'+nuevoPronostico.index_fecha_partido] = pronostico;
  firebase.database().ref().update(updates);

  let pronosticoGuardado;

  var pronosticoRef = firebase.database().ref().child('/pronosticos/user/'+nuevoPronostico.owner+'/index_fecha_partido/'+nuevoPronostico.index_fecha_partido);
  pronosticoRef.once('value', function (snapshot) {
    pronosticoGuardado = snapshot.val();

    if(!pronosticoGuardado){
      return cb(null,{message:'no userId'})
    }else{
      return cb(pronosticoGuardado, null);
    }
  })
};

/*
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
*/

//const League = require("../models/leagues.model")
const User = require("../models/user.model")
const Pronostico = require('../models/pronostico.model')

const _ = require('lodash')

exports.createPronostico = (req, res) => {

    User.getIdFromEmail(req.body.user.email,(userId) => {

        if(!userId){
            return res.status(409).json(`CREATE_LEAGUE_ERROR`)
        }

        let nuevoPronostico = {
            index_fecha_partido : req.body.index_fecha_partido,
            local_value : req.body.local_value,
            visitor_value : req.body.visitor_value,
            owner : userId
        }
        Pronostico.createPronostico(nuevoPronostico,(pronostico, err) => {
          if (err){
            return res.status(409).json(`CREATE_PRONISTICO_ERROR`)
          }
          return res.status(201).json(pronostico)
        })
    });
}
/*
exports.getLeagues = (req, res) => {
    User.getIdFromEmail(req.body.user.email,(userId) => {
        League.getLeaguesFromUser(userId, (leagues,err) => {
            if (err){
                return res.status(500).send("ERROR_LEAGUE_USER_COMMUNITIES")
            }
            return res.status(200).json(leagues)
        })
    })
}
*/

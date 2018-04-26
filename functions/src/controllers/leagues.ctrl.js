const League = require("../models/leagues.model")
const User = require("../models/user.model")
const _ = require('lodash')

exports.createLeague = (req, res) => {

    User.getIdFromEmail(req.body.user.email,(userId) => {

        if(!userId){
            return res.status(409).json(`CREATE_LEAGUE_ERROR`)
        }

        let newLeague = {
            name : req.body.name,
            private : req.body.private,
            password : req.body.password,
            owner : userId
        }
        League.leagueExist(newLeague,(league,err1) => {
            if(league){
                return res.status(409).json(`LEAGUE_NAME_EXIST`)
            }
            if (err1){
                return res.status(409).json(`LEAGUE_NAME_EXIST`)
            }
            if(!league){
                League.createLeague(newLeague,(league, err2) => {
                    if (err2){
                        return res.status(409).json(`CREATE_LEAGUE_ERROR`)
                    }
                    return res.status(201).json(league)
                })
            }
        })
    });
}

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

exports.searchLeague = (req, res) => {
    League.findLeague(req.params.name, (leagues,err) => {
        if (err){
            return res.status(500).send("ERROR_LEAGUE_SEARCH")
        }
        return res.status(200).json(leagues)
    })

}

exports.loginUserToLeague = (req, res) => {
        leagueName = req.body.name,
        leaguePassword = req.body.password

    League.leagueWithPasswordExist(leagueName, leaguePassword, (leagueUpdate, err) => {

        if (err){
            return res.status(500).send("ERROR_LEAGUE_EXIST")
        }
        if (!leagueUpdate) {
            return res.status(401).send("ERROR_LEAGUE_NOT_EXIST")
        }

        //let objValue = Object.values(leagueUpdate)[0];
        let objValue = _.values(leagueUpdate)[0];

        User.getIdFromEmail(req.body.user.email,(userId) => {
            if(!userId){
                return res.status(500).send("ERROR_LEAGUE_UPDATE")
            }
            League.updateLeague(objValue, userId, (leagueUpdated, err) => {
                if (err){
                    return res.status(500).send("ERROR_LEAGUE_UPDATE")
                }
                return res.status(200).json(leagueUpdated);
            })
        });
    })
}

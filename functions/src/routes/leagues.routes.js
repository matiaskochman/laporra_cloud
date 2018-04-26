'use strict'

const leagueCtrl = require("../controllers/leagues.ctrl")
//const Joi = require('joi')
//const validator = require('express-joi-validation')({ passError: true })
//const leagueValidator = require("../validators/league.validator")

module.exports = (app) => {

    app.route('/api/v1/private/league')
    .post(
        //validator.body(leagueValidator.createLeagueSchema, {joi: { allowUnknown: true }}),
            (req, res) => {
                leagueCtrl.createLeague(req, res)
            }
        )
        .get(
            (req, res) => {
                leagueCtrl.getLeagues(req, res)
            }
        )

    app.route('/api/v1/private/league/search/:name')
        .get(
            (req, res) => {
                leagueCtrl.searchLeague(req, res)
            }
        )

    // es necesario
    app.route('/api/v1/private/league/login')
    .post(
        //validator.body(leagueValidator.loginLeagueSchema, {joi: { allowUnknown: true }}),
            (req, res) => {
                leagueCtrl.loginUserToLeague(req, res)
            }
        )

}

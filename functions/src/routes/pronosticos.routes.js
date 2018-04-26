'use strict'

const pronosticosCtrl = require("../controllers/pronosticos.ctrl")
//const Joi = require('joi')
//const validator = require('express-joi-validation')({ passError: true })
//const leagueValidator = require("../validators/league.validator")

module.exports = (app) => {

    app.route('/api/v1/private/pronostico')
    .post(
        //validator.body(leagueValidator.createLeagueSchema, {joi: { allowUnknown: true }}),
            (req, res) => {
                pronosticosCtrl.createPronostico(req, res)
            }
        )
        .get(
            (req, res) => {
                pronosticosCtrl.getPronosticos(req, res)
            }
        )

}

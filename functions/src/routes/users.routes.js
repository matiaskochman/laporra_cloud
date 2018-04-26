'use strict'

const UserCtrl = require("../controllers/user.ctrl")
//const Joi = require('joi')
//const validator = require('express-joi-validation')({ passError: true })
//const userValidator = require("../validators/user.validator")
const passport = require('passport')
const passportConfig = require('../modules/passport')
passportConfig()


module.exports = (app) => {

    app.route('/api/v1/user/signin')
        .post(
            //validator.body(userValidator.userSchema, {joi: {allowUnknown: true }}),
            (req, res) => {
                UserCtrl.signIn(req, res)
            }
        )
        /*
    app.route('/api/v1/user/signin/facebook')
        .get(
            passport.authenticate('facebook-token', { session: false } ),
            (req, res, next) => {
                UserCtrl.signInFacebook(req, res)
            }
        )

    app.route('/api/v1/user/signin/instagram')
        .post(
            passport.authenticate('instagram-token'),
            (req, res, next) => {
                UserCtrl.signInFacebook(req, res)
            }
        )

    app.route('/api/v1/user/signin/google')
        .post(
            passport.authenticate('google-token'),
            (req, res, next) => {
                UserCtrl.signInFacebook(req, res)
            }
        )
*/
    app.route('/api/v1/user/create')
        .post(
            //validator.body(userValidator.userSchema, {joi: {allowUnknown: true }}),
            (req, res) => {
                UserCtrl.create(req, res)
            }
        )
/*
    app.route('/api/v1/private/user/update')
        .post(
            validator.body(userValidator.userSchema, {joi: {allowUnknown: true }}),
            (req, res) => {
                UserCtrl.update(req, res)
            }
        )

    app.route('/api/v1/private/user/search/:name')
        .get(
            validator.body(userValidator.userSchema, {joi: {allowUnknown: true }}),
            (req, res) => {
                UserCtrl.search(req, res)
            }
        )
*/
}

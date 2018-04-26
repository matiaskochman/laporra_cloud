'use strict'
const users = require('./users.routes.js')
const leagues = require('./leagues.routes.js')
//const jornadasmundial = require('./jornadasmundial.routes.js')

module.exports = (app) => {
    users(app)
    leagues(app)
}

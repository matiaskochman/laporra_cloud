'use strict'
/**
 * @module initMiddleware
 */

/**
 * @param {object} app
 * @param {object} express
 * @return configura la aplicación
 */

module.exports.useMiddleware = (app, express) => {
    const cors = require('cors')
    const bodyParser = require('body-parser')
    const options = {
        extensions: ['htm', 'html'],
        maxAge: '1d',
        setHeaders: res => res.set('x-timestamp', Date.now())
    }

    var corsOption = {
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        exposedHeaders: ['APP-TOKEN']
    }
    app.use(cors(corsOption))
    app.use(express.static(__dirname + '/static', options))
    app.use((peticion, respuesta, next) =>{
        console.log(`recibida petición: ${peticion.url}`)
        next()
    })
    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())
    app.use('/api/v1/private/', (req, res, next) => {
        const jwt = require('../modules/jwt')
        //const mongoose = require('mongoose')
        let appToken = req.get('APP-TOKEN'),
            tokenVerify = jwt.verify(appToken)

        if (tokenVerify) {
            let tokenDecode = jwt.decode(appToken)
            req.body.user = tokenDecode
            req.body.user.password = ''
            req.body.user._id = tokenDecode.uid
            req.body.user.email = tokenDecode.email
            return next()
        } else {
            res.status(401).json('INVALID_CREDENTIALS')
        }
    })
}

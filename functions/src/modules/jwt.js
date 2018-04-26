'use strict'
const jwt = require('jsonwebtoken')

const secret = '+_]@3gM_Q3nz*?{$22l/:@t[/=[pD#6<DO{}^S|JZ<#@By26wuS`{Lc7mc>p[I+'

exports.generaToken = (user) => jwt.sign(user, secret, { expiresIn: '100d' })

exports.verify = (token) => {
    try {
        return jwt.verify(token, secret)
    }
    catch(err){
        return false
    }
}

exports.decode = (token) => {
    let decoded = jwt.decode(token, {complete: true});
    //return decoded.payload._doc;
    return decoded.payload;
}

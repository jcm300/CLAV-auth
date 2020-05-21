var express = require('express');
var router = express.Router();

var Auth = require('../controllers/auth')

const { validationResult } = require('express-validator')
const { eJWT, eExpiresTime, eObjeto } = require('./validation')

router.post('/sign', [
    eObjeto('body', 'user'),
    eExpiresTime('body', 'expiresIn')
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array())
    }

    try{
        var token = Auth.generateTokenUser(req.body.user, req.body.expiresIn)
        res.jsonp({ token: token });
    }catch(error){
        res.status(500).send(error)
    }
});

router.post('/verify', [
    eJWT('body', 'key')
], (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array())
    }

    try{
        var decoded = Auth.verifyTokenUser(req.body.key)
        res.jsonp(decoded);
    }catch(error){
        res.status(500).send(error)
    }
});

module.exports = router;

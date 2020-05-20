var Auth = module.exports;
var ExtractJWT = require("passport-jwt").ExtractJwt;
var jwt = require('jsonwebtoken');
var axios = require('axios');
var secretKey = require('./../config/keys');
var APIHost = require('../config/api').APIHost

Auth.generateTokenUser = function (user, expiresIn) {
    return jwt.sign({id: user._id, level: user.level, entidade: user.entidade, email: user.email}, secretKey.userPrivateKey, {expiresIn: expiresIn, algorithm: 'RS256'});
}

Auth.verifyTokenUser = function (key) {
    return jwt.verify(key, secretKey.userPublicKey, { algorithms: ['RS256'] })
}

Auth.generateTokenKey = function (chaveId, expiresIn) {
    return jwt.sign({id: chaveId}, secretKey.apiPrivateKey, {expiresIn: expiresIn, algorithm: 'RS256'});
}

Auth.verifyTokenKey = function (key) {
    return jwt.verify(key, secretKey.apiPublicKey, { algorithms: ['RS256'] })
}

//verifica se está forneceu chave API. Em caso afirmativo verifica se é válido. Caso não tenha fornecido uma chave API verifica se forneceu antes um token.
Auth.isLoggedInKey = function (req, res) {
    var key = ExtractJWT.fromExtractors([
        ExtractJWT.fromUrlQueryParameter('apikey'),
        ExtractJWT.fromAuthHeaderWithScheme('apikey')
    ])(req)

    if(key){
        axios.get(APIHost + "/chaves/" + key)
            .then(response => {
                var chave = response.data
                try{
                    var decoded = Auth.verifyTokenKey(key)
                    if(chave.active==true){
                        res.jsonp(decoded)
                    }else{
                        res.status(403).send('A sua chave API foi desativada, por favor contacte os administradores do sistema.');
                    }
                }catch(err){
                    res.status(401).send('A sua chave API é inválida ou expirou.');
                }
            })
            .catch(err => res.status(401).send('A sua chave API é inválida ou expirou.'))
    }else{
        return Auth.isLoggedInUser(req, res, user => {
            res.jsonp(user)
        })
    }
}

//Verifica se um utilizador (token) está autenticado
Auth.isLoggedInUser = function (req, res, callback) {
    var key = ExtractJWT.fromExtractors([
        ExtractJWT.fromUrlQueryParameter('token'),
        ExtractJWT.fromAuthHeaderWithScheme('token')
    ])(req)

    if(key){
        callback(Auth.verifyTokenUser(key))
    }else{
        res.status(401).send("Unauthorized")
    }
}

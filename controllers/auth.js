var Auth = module.exports;
var ExtractJWT = require("passport-jwt").ExtractJwt;
var jwt = require('jsonwebtoken');
var axios = require('axios');
var secretKey = require('./../config/keys');
var APIHost = require('../config/vars').APIHost

Auth.generateTokenUser = function (user, expiresIn) {
    return jwt.sign({id: user.id, level: user.level, entidade: user.entidade, email: user.email}, secretKey.userPrivateKey, {expiresIn: expiresIn, algorithm: 'RS256'});
}

Auth.verifyTokenUser = function (key) {
    return jwt.verify(key, secretKey.userPublicKey, { algorithms: ['RS256'] })
}

Auth.generateTokenKey = function (apikey, expiresIn) {
    return jwt.sign({id: apikey.id}, secretKey.apiPrivateKey, {expiresIn: expiresIn, algorithm: 'RS256'});
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
                if(chave){
                    try{
                        var decoded = Auth.verifyTokenKey(key)
                        if(chave.active==true){
                            decoded.idType = "Chave"
                            res.jsonp(decoded)
                        }else{
                            res.status(403).send('A sua chave API foi desativada, por favor contacte os administradores do sistema.');
                        }
                    }catch(err){
                        res.status(401).send('A sua chave API é inválida ou expirou.');
                    }
                }else{
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
        try{
            var decoded = Auth.verifyTokenUser(key)
            decoded.idType = "User"
            callback(decoded)
        }catch(err){
            res.status(401).send("Unauthorized")
        }
    }else{
        res.status(401).send("Unauthorized")
    }
}

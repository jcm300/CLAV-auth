var Auth = module.exports;
var passport = require("passport");
var ExtractJWT = require("passport-jwt").ExtractJwt;
var jwt = require('jsonwebtoken');
var Key = require('../models/chave');
var secretKey = require('./../config/app');
var Calls = require('./api/logs')

//WARNING: correr primeiro isLoggedInUser e só depois correr esta função como middleware
//clearance se for um número, permite o acesso a todos os utilizadores com nivel igual ou superior; se for uma lista de números, apenas permite ao acesso aos níveis presentes nessa lista.
Auth.checkLevel = function (clearance) {
    return function(req, res, next) {
        var havePermissions = false;

        //Array
        if (clearance instanceof Array) {
            if (clearance.includes(req.user.level)) {
                havePermissions = true;
            }
        //Number
        } else {
            if (req.user.level >= clearance) {
                havePermissions = true;
            }
        }

        if (havePermissions) {
            return next();
        } else {
            return res.status(403).send('Não tem permissões suficientes para aceder');
        }
    }
}

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
Auth.isLoggedInKey = async function (req, res, next) {
    var key = ExtractJWT.fromExtractors([
        ExtractJWT.fromUrlQueryParameter('apikey'),
        ExtractJWT.fromAuthHeaderWithScheme('apikey')
    ])(req)

    if(key){
        await Key.find({key: key}, async function(err, resp){
            if(err){
                //throw err;
                res.status(401).send('A sua chave API é inválida ou expirou.');
            }else if(resp.length==0){
                //A sua chave API não se encontra na base de dados
                res.status(401).send('A sua chave API é inválida ou expirou.');
            }else{
                await Auth.verifyTokenKey(key, async function(err, decoded){
                    if(err){
                        res.status(401).send('A sua chave API é inválida ou expirou.');
                    }else{
                        if(resp[0].active==true){
                            await Key.updateOne({_id: resp[0]._id}, {nCalls: resp[0].nCalls+1, lastUsed: Date.now()}, function(err, affected, resp2) {
                                if(err){
                                    res.status(500).send('Ocorreu um erro ao atualizar a Chave API.');
                                }else{
                                    res.locals.id = resp[0]._id
                                    res.locals.idType = "Chave"
                                    next()
                                }
                            })
                        }else{
                            res.status(403).send('A sua chave API foi desativada, por favor contacte os administradores do sistema.');
                        }
                    }
                });
            }
        })
    }else{
        return Auth.isLoggedInUser(req, res, next)
    }
}

//Verifica se um utilizador (token) está autenticado
Auth.isLoggedInUser = function (req, res, next) {
    passport.authenticate("jwt", { session: false }, function(err, user, info) {
        if (err) { return res.status(401).send("Unauthorized") }
        if (!user) { return res.status(401).send("Unauthorized") }
        req.logIn(user, function(err) {
            if (err) { return res.status(401).send("Unauthorized") }

            res.locals.id = req.user.id
            res.locals.idType = "User"
            next()
        })
    })(req, res, next)
}

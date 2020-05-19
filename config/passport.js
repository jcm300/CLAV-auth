var LocalStrategy = require('passport-local').Strategy;
var JWTstrategy = require("passport-jwt").Strategy;
var ExtractJWT = require("passport-jwt").ExtractJwt;
var secretKey = require('./../config/app');
var Users = require('../controllers/api/users');

module.exports = function(passport) {
    passport.use("login", new LocalStrategy(
        function (email, password, done) {
            Users.getUserByEmail(email, function (err, user) {
                if (err) done(err);
                if (!user) {
                    //return done(null, false, { message: 'Email não reconhecido' });
                    //Evitar que se perceba que emails já estão presentes
                    return done(null, false, { message: 'Ocorreu um erro ao realizar o login! Por favor verifique as suas credenciais.' });
                }

                Users.comparePassword(password, user.local.password, function (err, isMatch) {
                    if (err) done(err);
                    if (isMatch) {
                        if(user.level==-1){
                            return done(null, false, { message: 'Utilizador desativado.' });
                        }else{
                            return done(null, user, { message: 'Login efetuado com sucesso.' });
                        }
                    } else {
                        return done(null, false, { message: 'Ocorreu um erro ao realizar o login! Por favor verifique as suas credenciais.' });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Users.getUserById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use("jwt", new JWTstrategy({
        secretOrKey: secretKey.userPublicKey,
        algorithms: ["RS256"],
        jwtFromRequest: ExtractJWT.fromExtractors([
            ExtractJWT.fromUrlQueryParameter('token'),
            ExtractJWT.fromAuthHeaderWithScheme('token')
        ])
    }, async (token, done) => {
        done(null, token);
    }))
};

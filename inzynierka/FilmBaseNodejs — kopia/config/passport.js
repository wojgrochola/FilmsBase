var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');

module.exports = function(passport) {

	//serialize and deserialize
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function () {
        	return done(null, profile);
        });
    }));


  

};


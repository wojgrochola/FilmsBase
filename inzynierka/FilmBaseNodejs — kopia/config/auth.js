// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1015885325142156', // your App ID
        'clientSecret'  : 'a9e1e624e61c59812f680a407f848e95', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '259321333966-crqjuni2494ubjlhhhlg6sgj25dbq26n.apps.googleusercontent.com',
        'clientSecret'  : 'ayaYl9LJ5eCUUjKWAImu-ojA',
        'callbackURL'   : 'http://tmp123.mybluemix.net/auth/google/callback'
        //'callbackURL'   : 'http://filmsbase.mybluemix.net/auth/google/callback'
        //'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};
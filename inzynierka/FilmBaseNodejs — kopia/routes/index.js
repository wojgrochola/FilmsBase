var express = require('express');
var router = express.Router();
var passport 	= require('passport');


require('../config/passport')(passport);

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login')
}




router.get('/helloworld', function(req, res) {
	res.render('helloworld', {title: 'Hello world!' });
});

router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/login',
        failureRedirect : '/'
    }));

router.get('/login',  function(req, res) {
    if (!req.user) {
        req.flash('info', "Zaloguj sie");
        res.render('index', {unlogged: req.flash('info')});
    } else {
        req.flash('info', "Zalogowano");
        res.render('index', {user: req.user, logged: req.flash('info')});
    }
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('info', "Wylogwales sie");
    res.render('index', {logout: req.flash('info')});
});

/* GET Userlist page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('films');
    var passport = req.db;
    console.log(req.user)


    res.render('index', {user: req.user})
});


router.get('/all', ensureAuthenticated,  function(req, res) {
    console.log(Date());
    var db = req.db;
    var collection = db.get('films');
    var passport = req.db;

    collection.find({},{},function(e, docs){
    	     res.render('filmlist', { user: req.user
        });
    });
    //console.log("pobrano");
});

router.get('/filmlist/sorteddate', ensureAuthenticated,  function(req, res) {
    var db = req.db;
    var collection = db.get('films');
    collection.find( { $query: {}, $orderby: { date : -1 } }, {}, function(e, docs) {
        res.json(docs);
    });
});

router.get('/filmlist', ensureAuthenticated,   function(req, res) {
	  var db = req.db;
	  var collection = db.get('films');
	  //collection.find( { $query: {}, $orderby: { date : 1 } }, {}, function(e, docs) {
      collection.find( {}, {}, function(e, docs) {
		  res.json(docs);
	  });
	});


router.delete('/deletefilm/:id',    function(req, res) {
    var db = req.db;
    var collection = db.get('films');
    var id = req.params.id;
    collection.remove({ '_id' : id }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


router.get('/newfilm', ensureAuthenticated,  function(req, res) {

	res.render('newfilm', {messages: req.flash('info'), user: req.user});
});




router.get('/getfilm/:id', ensureAuthenticated, function(req, res){
    var db = req.db;
    var id = req.params.id;
    var collection = db.get('films');
    collection.find({ '_id': id}, {}, function(e, docs) {
        console.log(docs.name);
        res.json(docs);
    });
});

router.get('/editfilm/:id', ensureAuthenticated,  function(req, res) {
    var db = req.db;
    var id = req.params.id;
    res.render('editfilm', {
            "id" : id, user: req.user
    });
});

router.get('/filmpage/:id', ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    res.render('filmpage', {
        "id" : id
    })
});
module.exports = router;

var express     = require('express');
var router      = express.Router();
var passport 	= require('passport');
var multer      = require('multer')
var upload      = multer({ dest: 'public/images' })
require('../config/passport')(passport);


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login')
}




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


router.get('/', function(req, res) {
    res.render('index', {user: req.user})
});


router.get('/all', ensureAuthenticated,  function(req, res) {
	     res.render('filmlist', { user: req.user })
});

router.get('/filmlist/sorteddate',   function(req, res) {
    var db = req.db;
    var collection = db.get('films');
    collection.find( { $query: {}, $orderby: { date : -1 } }, {}, function(e, docs) {
        if (e)
            res.send(e)
        else
            res.json(docs);
    });
});

router.get('/filmlist', ensureAuthenticated,   function(req, res) {
	  var db = req.db;
	  var collection = db.get('films');
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


router.post('/addfilm',upload.single('photo'),  function (req, res, next) {
    console.log(req.file);
    console.log("in");
    var db = req.db;
    if (req.file)
        var filename = req.file.filename;
    else
        var filename = "noimg.jpg";
    console.log(filename);
    var name = req.body.name;
    var genre = req.body.genre;
    var year = req.body.year;
    var country = req.body.country;
    var details = req.body.details;

    var collection = db.get('films');

    collection.insert({
        "name" : name,
        "genre" : genre,
        "year" : year,
        "country" : country,
        "filename": filename,
        "details" : details,
        "date" : new Date()
    }, function (err, doc) {
        if (err) {

            res.send("Something get wrong!");
        }
        else {

            req.flash('added', "Dodano film do bazy!");
            res.render('filmlist', {added: req.flash('added')});

        }
    });

    console.log("add");
})

router.post('/editfilm/:_id',upload.single('photo'),  function (req, res, next) {
    var db = req.db;
    if (req.file)
        var filename = req.file.filename;
    else
        var filename = "noimg.jpg";
    console.log(filename);
    var id = req.params._id;
    var name = req.body.name;
    var genre = req.body.genre;
    var year = req.body.year;
    var country = req.body.country;
    var details = req.body.details;

    var collection = db.get('films');

    collection.update( { '_id': id}, {
        "name": name,
        "genre": genre,
        "year": year,
        "country": country,
        "filename": filename,
        "details": details,
        "date": new Date()
    },
       function (err, doc) {
           if (err) {

               res.send("Something get wrong!");
           }
           else {

               res.redirect("/all");

           }

    });


})


module.exports = router;

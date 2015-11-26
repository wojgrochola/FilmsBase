var express		 	= require('express');
var path 			= require('path');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var session      	= require('express-session');

var configDB 	= require('./config/database.js');
var mongo 		= require('mongodb');
var monk 		= require('monk');
var passport 	= require('passport');
var flash    	= require('connect-flash');
var multer  = require('multer')
var upload = multer({ dest: 'public/images' })
//
//console.log('VCAP SERVICES: ' + JSON.stringify(process.env.VCAP_SERVICES, null, 4));
//    var mongoUrl;
//    if(process && process.env && process.env.VCAP_SERVICES) {
//      var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
//      for (var svcName in vcapServices) {
//        if (svcName.match(/^mongo.*/)) {
//          mongoUrl = vcapServices[svcName][0].credentials.uri;
//          mongoUrl = mongoUrl || vcapServices[svcName][0].credentials.url;
//          break;
//        }
//      }
//    } else {
//      mongoUrl = "localhost:27017/nodetest1";
//    }
//    console.log('Mongo URL: ' + mongoUrl);

var mongo = process.env.VCAP_SERVICES;
var port = process.env.PORT || 3030;
var conn_str = "";
if (mongo) {
    var env = JSON.parse(mongo);
    if (env['mongodb-2.4']) {
        mongo = env['mongodb-2.4'][0]['credentials'];
        if (mongo.url) {
            conn_str = mongo.url;
        } else {
            console.log("No mongo found");
        }
    } else {
        conn_str = 'mongodb://localhost:27017';
    }
} else {
    conn_str = 'mongodb://localhost:27017';
}

console.log(conn_str)

var db 			= monk(conn_str);

var routes 		= require('./routes/index');
var users 		= require('./routes/users');

var app = express();

require('./config/passport')(passport); // pass passport for configuration

// view engine setup
app.set('views', path.join(__dirname, 'views_bootstrap'));
app.set('view engine', 'jade');


app.use(cookieParser());
//required for passport
app.use(session({ secret: 'sesja' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

//routes ======================================================================
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
    next();
});



app.use('/', routes);

app.post('/addfilm',upload.single('photo'),  function (req, res, next) {
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


app.post('/editfilm/:_id',upload.single('photo'),  function (req, res, next) {
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



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var express 			= require('express')
var jwt 					= require('jsonwebtoken')
var md5 					= require('md5')
var bodyParser 		= require('body-parser')
var morgan 				= require('morgan')
var expressjwt 		= require('express-jwt')
var jwt 					= require('jsonwebtoken')
var cookieParser	= require('cookie-parser')

var app 					= express();

var config = require('./config')

var getTokenFromCookie = function (req) {
		console.log("POLLAS")

    if (req.cookies.Authorization && req.cookies.Authorization.split(' ')[0] === 'Bearer') {
        return req.cookies.Authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }

		req.headers.token

		console.log(req.cookies)

    return null;
}

app.use(morgan('dev'))

app.use('/public', express.static(__dirname + '/public'))
//app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

// ROUTES
// JWT Authentication endpoint
app.post('/auth', (req, res) => {

	if (req.body.user && req.body.user == config.user && req.body.pass && md5(req.body.pass) == config.pass){

		var payload = {
			name: 'marcos',
			role: 'admin'
		}

		res.send(jwt.sign(payload, config.secret))

	} else {
		res.sendStatus(401);
	}

});

/* TODO: Find a way to reuse the shared parts and declare only sections like ASP.MVC*/

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/core/public/index.html');
});

app.get('/user', function(req, res){
  res.sendFile(__dirname + '/public/core/user/index.html');
});

app.get('/admin', expressjwt({secret: config.secret, getToken: getTokenFromCookie}), function(req, res){
	
  	res.sendFile(__dirname + '/public/core/admin/index.html');
});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/core/shared/404.html');
})

app.listen(config.port, function () {
  console.log('Angular JWT Example running at http://localhost:' + config.port);
});

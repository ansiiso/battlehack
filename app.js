
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , config = require('./config')
  , SendGrid = require('sendgrid').SendGrid
  , sendgrid = new SendGrid(config.user, config.pass)
  , Email = require('sendgrid').Email
;

var emailSupporter = function(addr, supportName, vetName) {
    var optionalParams = {
	to: addr,
	from: 'onetroop@onetroop.com',
	subject: 'Hi ' + supportName + '!  Thank you for subscribing to ' + vetName + '!',
	text: 'Hi ' + supportName + '!  Thank you for subscribing to ' + vetName + '!',
	html: '',
	bcc: [],
	replyto: '',
	date: new Date(),
	file_data: {},
	headers: {}
    };
    var emailToSupporter = new Email(optionalParams);

    emailToSupporter.addFile({
	filename: 'happy.jpg',          // required only if file.content is used.
	path: './happy.jpg'
    });

    emailToSupporter.addFile({
	filename: 'lol.jpg',
	url: 'http://cache.ohinternet.com/images/b/b0/Lolcat.JPG'
    });

    sendgrid.send(emailToSupporter, function(success, message) {
	if (!success) {
	    console.log(message);
	}
    });
    
}


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/recording', api.recording);
app.post('/subscribe', function(req, res) {
    console.log(req.body.email);
    emailSupporter(req.body.email, 'awesome person', 'George Washington');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

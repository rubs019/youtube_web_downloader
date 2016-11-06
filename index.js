var express = require('express');
var pug = require('pug');
var app = express();
var bodyParser = require('body-parser'); // For read json file
var helmet = require('helmet'); // For security
var AdmZip = require('adm-zip'); // For Zip File
var request = require('request'); // For Download mP3
var fs = require('fs');  
var download = require('download');

app.use(helmet());

// 	app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
// Set views
app.set('views', './views');
app.set('view engine', 'pug');
// Set Assets
app.use('/css', express.static(__dirname + '/assets/css'));
app.use('/js', express.static(__dirname + '/assets/js'));
app.use('/img', express.static(__dirname + '/assets/img'));

// GET
app.get('/', function (req, res) {
	res.render('index', {title: 'Youtube Download'});
});

// POST
app.post('/request', function(req, res){
	result = req.body;
	console.log(result.param);
	request(result.param.link, function (error, response, body) {
		res.json({response: true});
	})
});
// PORT
var port = 4000;
app.listen(port, function () {
  console.log('Example app listening on port '+port+' !');
});

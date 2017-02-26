var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/tsdb');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


app.listen(3000);
console.log("App listening on port 3000");

//============================GBIF=============================================
var GBIF = require("./models/gbif").gbif;

app.get('/gbif', function (req, res) {
	GBIF.find(function(err , data){
		if(err)
			res.send(err)

		res.json(data);
	});
});

app.get('/gbif', function(req,res){
	GBIF.find({nameAccordingTo: 'value'}, function(err, data){
		if(err)
			res.send(err.message)

		res.json(data);
	});
});

app.get('/gbif/:taxonID', function(req, res) {
	GBIF.find({
		taxonID : req.params.taxonID
	}, function(err, data) {
		if(err)
			res.send(err)

		res.json(data);
	});
});

//============================NCBI=============================================
var NCBI = require("./models/ncbi").ncbi;

app.get('/ncbi', function (req, res) {
	GBIF.find(function(err , data){
		if(err)
			res.send(err)

		res.json(data);
	});
});

app.get('/ncbi/:tax_id', function(req, res) {
	GBIF.find({
		taxonID : req.params.tax_id
	}, function(err, data) {
		if(err)
			res.send(err)

		res.json(data);
	});
});
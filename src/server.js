var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

mongoose.connect('mongodb://localhost/GBIF');

app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


app.listen(3000);
console.log("App listening on port 3000");

var Merge = require("./models/merge.js").Merge;

app.get('/Merge', function(req, res) {
	console.log("i received a GET request");
	Merge.find({$text: {$search}}, function(err, data) {
		if(err)
			res.send(err)
		res.json(data)
	});
});

app.get('/Merge/:search', function(req, res) {
	Merge.find({"scientificName": {$regex :"$"  }}, function(err, pubs_res) {
		if(err)
			res.send(err);
		res.json(data);
	});
});

app.get('/', function(req, res) {
	res.sendFile('./public/replant_HomePage.html', {root: __dirname});
});
//============================GBIF=============================================
/*var GBIF = require("./models/gbif").Gbif;

app.get('/gbif', function (req, res) {
	GBIF.findOne(function(err , data){
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
var NCBI = require("./models/ncbi").Ncbi;

app.get('/ncbi', function (req, res) {
	NCBI.findOne(function(err , data){
		if(err)
			res.send(err)

		res.json(data);
	});
});

app.get('/ncbi/:tax_id', function(req, res) {
	NCBI.find({
		taxonID : req.params.tax_id
	}, function(err, data) {
		if(err)
			res.send(err)

		res.json(data);
	});
});

//=============================HOMEPAGE=========================================
app.get('/', function(req, res) {
	res.sendFile('./public/replant_HomePage.html', {root: __dirname});
});

app.get('/search/:term', function(req, res) {
	GBIF.findOne({
		scientificName: {$regex: req.params.term}
	}, function(err, res) {
		if(err)
			res.send(err)
		res.json(res);
	});
});*/
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/GBIF');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


app.listen(3000);
console.log("App listening on port 3000");

var Schema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	taxonID : Number,
	datasetID : mongoose.Schema.Types.Mixed,
	parentNameUsageID : Number,
	acceptNameUsageID : Number,
	originalNameUsageID : Number,
	scientificName : String,
	scientificNameAuthorship : String,
	canonicalName : String,
	genericName : String,
	specificEpithet : String,
	infraspecificEpithet : String,
	taxonRank : String,
	nameAccordingTo : String,
	namePublishedIn : String,
	taxonomicStatus : String,
	nomenclaturalStatus : String,
	kingdom : String,
	phylum :  String,
	class  : String,
	order  : String,
	family : String,
	genus  : String,
	taxonRemarks : String,
	distribution : [],
	multimedia   : [mongoose.Schema.Types.Mixed],
	references   : [],
	vernacularname : [{
		sex : String,
		lifeStage : String,
		source : String,
		vernacularName : String,
		language : String,
		country : String,
		countryCode : String

	}],

});

var GBIF = mongoose.model('GBIF', Schema);


app.get('/GBIF', function (req, res) {
	GBIF.find(function(err , data){
			if(err){
				res.send(err)
			}else{
			res.send(data);
		}
	});
});

app.get('/GBIF', function(req,res){
	GBIF.find({nameAccordingTo: 'value'}, function(err, data){
		if(err){
			res.send(err.message);
		}
		else{
			res.send(data);
		}
	});
});

app.get('*', function(req, res){
	res.sendFile('./public/testing.html', { root: __dirname });
});


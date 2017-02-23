var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/GBIFF');


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));

app.listen(3000);
console.log("App listening on port 3000);

var Schema = mongoose.Schema({
	"_id" : mongoose.Schema.Types.ObjectId,
	"coreID" : Number,
	"taxonID" : Number,
	"datasetID" : mongoose.Schema.Types.Mixed,
	"parentNameUsageID" : Number,
	"acceptNameUsageID" : Number,
	"scientificName" : String,
	"taxonRank" : String,
	"nameAccordingTo" : String,
	"namePublishedIn" : String,
	"taxonomicStatus" : String,
	"nomenclaturalStatus" : String,
	"kingdom" : String,
	"phylum" :  String,
	"class"  : String,
	"order"  : String,
	"family" : String,
	"genus"  : String,
	"taxonRemarks" : String,
	"distribution" : [],
	"multimedia"   : [mongoose.Schema.Types.Mixed],
	"references"   : [],
	"vernacularname" : [],

});
var GBIFF = connection.model('GBIFF', Schema);

app.get('/GBIFF', function (req, res) {
	db.GBIFF.find(function(err,docs){
			if(err){
				res.send(err)
			}else{
			res.json(docs);
		}
	});
});

app.get('/GBIFF', function(req,res){
	db.GBIFF.find({nameAccordingTo: 'value'}, function(err, data){
		if(err){
			res.send(err.message);
		}
		else{
			res.send(data);
		}
	});
});

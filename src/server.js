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

var Schema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	taxonID : Number,
	datasetID : String,
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
	distribution : [{
		threatStatus : String,
		establishmentMeans : String,
		lifeStage : String,
		source : String,
		country : String,
		occuranceStatus : String,
		countryCode : String,
		locationID : String,
		locality : String,
		locationRemarks : String
	}],
	multimedia   : [{
		license : String,
		rightsHolder : String,
		creator : String,
		references : String,
		contributor : String,
		source : String,
		identifier : String,
		created : String,
		title : String,
		publisher : String,
		description : String
	}],
	references   : [{
		bibliographicCitation : String,
		references : String,
		source : String,
		identifier : String
	}],
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

var nSchema = mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	tax_id : Number,
	parent_tax_id : Number,
	rank : String,
	embl_code : String,
	inherited_div_flag : Number,
	inherited_GC_flag : Number,
	mitochondrial_genetic_code_id : Number,
	inherited_MGC_flag : Number,
	GenBank_hidden_flag : Number,
	hidden_subtree_root_flag : Number,
	comments : String,
	names : [{
		name_txt : String,
		unique_name : String,
		name_class : String
	}],
	division : [{
		cde : String,
		name : String,
		comments : String
	}],
	gencode : [{
		abbreviation : String,
		name : String,
		cde : String,
		starts : String
	}],
	citations : [{
		cit_key : String,
		pubmed_id : Number,
		medline_id : Number,
		url : String,
		text : String
	}]
});

var GBIF = mongoose.model('GBIF', Schema);
var NCBI = mongoose.model('NCBI', nSchema);


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

app.get('*', function(req, res){
	res.sendFile('./replant_HomePage.html', { root: __dirname + '/public' });
});


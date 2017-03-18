var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/GBIF';

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

MongoClient.connect(url, function(err, db){

	if(err){
		console.log('connect failed', err);
	}
	else{
		console.log("connected");
	}
})


app.listen(3000);
console.log("App listening on port 3000");



// search for scientific name
app.post('/', function(req, res) {
	db.merge.find({"$text" :{
		"$search" : req.body.name
	}
},{ $or:[{canonicalName :1}, {scientificName:1}]}).toArray(function(err, data){
	res.send(data);
})
});

//findOne

app.get('/Merge', function(req,res){
	db.merge.findOne({"_id": { "$in" :[/^req.body.name/i]}}).toArray(function(err, data){res.send(data);
})
});

/*app.get('/result', function(req, res){
	db.merge.find

})*/
/*app.get('/Merge', function(req,res){
	db.merge.find({"canonicalName": {$text :{
		"search": req.body.name
	}}})

})*/
app.post('/', function(req, res) {
	db.merge.find({"$text" :{
		"$search" : req.body.name
	}
},{ taxonRank :1}).toArray(function(err, data){
	res.send(data);
})
});



app.get('/', function(req, res) {
	res.sendFile('./public/replant_HomePage.html', {root: __dirname});
});




/*
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
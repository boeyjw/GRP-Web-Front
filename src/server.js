/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
//var url = 'mongodb://localhost:27017/g52grp';
var url = 'mongodb://haploid:f1du-c1ary@g52grp-shard-00-00-sdhki.mongodb.net:27017,g52grp-shard-00-01-sdhki.mongodb.net:27017,g52grp-shard-00-02-sdhki.mongodb.net:27017/g52grp?ssl=true&replicaSet=g52grp-shard-0&authSource=admin'
    /*
     * Only can be accessed from anywhere but uni network and mobile data.
     * Access uses P2P.
     */
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Unable to connect', err);
    } else {
        console.log('connected', url);
    }

    var collection = db.collection('merge');


    /*app.post('/result/:_id', function(req, res){
    	collection.findOne({"$search":_id},{scientificName:1,taxonID :1 , canonicalName:1,parentTaxId:1, rank:1}, function(err,data){
    		if(err){
    			console.log(err);
    		}else{
    		//console.log(data);
    		res.send(data);
    		}
    		})
    	});*/

    app.get('/find/:name', function(req, res) {
        console.log(req.params)
        collection.find({
            "$text": {
                "$search": req.params.name
            }
        }, { scientificName: 1, gbif_taxonID: 1, ncbi_tax_id: 1, canonicalName: 1, parentTaxId: 1, rank: 1, 'multimedia.identifier': 1 }).toArray(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.send(data)

            }
        })

    });

    /*collection.findOne({taxonID:12},{scientificName:1,taxonID :1 , canonicalName:1,parentTaxId:1, rank:1}).toArray(function(err, data){
    	if(err){
    		console.log(err);
    	}
    	else{
    		console.log(data);
    		//res.send(data)

    	
    }
    })
    */
    /*app.post('/':_id, function(req,res){
    	collection.find().limit(5).toArray(function(err, data){
    		if(err){
    			console.log(err);
    		} else{
    			res.send(data)
    		}
    	})
    });*/

});
app.listen(3000);
console.log("App listening on port 3000");



// search for scientific name
/*app.post('/', function(req, res) {
	db.merge.find({"$text" :{
		"$search" : "scientificName"
	}
},{ $or:[{canonicalName :1}, {scientificName:1}]}).toArray(function(err, data){
	if(err){
		console.log(err);
	}
	else{
		console.log(data);
	res.send(data);
	
}
})
});
*/



/*app.post('/', function(req, res) {
	db.merge.find({"$text" :{
		"$search" : "Bryophyta"
	}
},{ $or:[{canonicalName :1}, {scientificName:1}]}).toArray(function(err, data){
	if(err){
		console.log(err);
	}
	else{
		console.log(data);
	res.send(data);
	
}
})
});*/

//findOne

/*app.get('/Merge', function(req,res){
	db.merge.findOne({"_id": { "$in" :[/^req.body.name/i]}}).toArray(function(err, data){res.send(data);
})
});
*/

/*app.get('/result', function(req, res){
	db.merge.find

})*/
/*app.get('/Merge', function(req,res){
	db.merge.find({"canonicalName": {$text :{
		"search": req.body.name
	}}})

})*/
/*app.post('/', function(req, res) {
	db.merge.find({"$text" :{
		"$search" : req.body.name
	}
},{ taxonRank :1}).toArray(function(err, data){
	res.send(data);
})
});
*/


app.get('/', function(req, res) {
    res.sendFile('./public/replant_HomePage.html', { root: __dirname });
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
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


    app.get('/result/:_id', function(req, res) {
        var objectid = "ObjectId(\"" + req.params._id + "\")";
        console.log(req.params._id)
        collection.find(objectid, function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.send(data);
            }
        })
    });

    app.get('/find/:name', function(req, res) {
        console.log(req.params)
        collection.find({
            "$text": {
                "$search": req.params.name
            }
        }, { scientificName: 1, gbif_taxonID: 1, ncbi_tax_id: 1, canonicalName: 1, parentTaxId: 1, rank: 1, 'multimedia.identifier': 1, taxonRank: 1, distribution: 1 }).toArray(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                res.send(data)
            }
        })
    });

    app.post('/fupdoc/:upt', function(req, res) {
        console.log(req.params)
        collection.update({}, {
            $set: {
                //Add a field
            }
        }, function(err, data) {
            if (err)
                console.log(err);
            else {
                console.log(data);
            }
        })
    });

});
app.listen(3000);
console.log("App listening on port 3000");

app.get('/', function(req, res) {
    res.sendFile('./public/replant_Index.html', { root: __dirname });
});
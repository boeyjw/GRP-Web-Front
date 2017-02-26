var mongoose = require("mongoose");

var GbifSchema = new mongoose.Schema({
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

	}]
});

var Gbif = mongoose.model("Gbif", GbifSchema, "gbif");

module.exports = {
	Gbif: Gbif
}
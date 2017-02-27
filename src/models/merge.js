var mongoose = require("mongoose");

var MergeSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,
	taxonID : Number,
	tax_id : Number,
	datasetID : String,
	parent_tax_id : Number,
	rank : String,
	embl_code : String,
	inherited_div_flag : Number,
	inherited_GC_flag : Number,
	mitochondrial_genetic_code_id : Number,
	inherited_MGC_flag : Number,
	GenBank_hidden_flag : Number,
	hidden_subtree_root_flag : Number,
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
	}],
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

var Merge = mongoose.model('Merge', MergeSchema, "merge");

module.exports = {
	Merge: Merge
}
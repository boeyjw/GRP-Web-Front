var mongoose = require("mongoose");

var NcbiSchema = mongoose.Schema({
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

var Ncbi = mongoose.model('Ncbi', NcbiSchema);

module.exports = {
	Ncbi: Ncbi
}
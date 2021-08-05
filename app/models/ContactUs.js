var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var ContactUsSchema = new mongoose.Schema({
	name : {
		type : String
	},
	email : {
		type : String
	},
	phone : {
		type : Number
	},
	discription : {
		type: String
	}
})

ContactUsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('ContactUs', ContactUsSchema);
var mongoose              = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');
var Schema                = mongoose.Schema;
// var passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/code-play", { useNewUrlParser: true ,useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var UserSchema = new Schema({
	username: {
		type:String,
		required:true
	},
	password: {
		type:String
	},//String,
	name:{
		type:String,
		required:true
	},//String,
	// lastName:String,
	email:{ 
		type:String,
		unique:true,
		required: true
	},
	//requireed for password reset
	resetPasswordToken:String,
	resetPasswordExpires: Date,
	// isAdmin :{type: Boolean,default: false}
	
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);
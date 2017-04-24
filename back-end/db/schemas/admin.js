var commonMethods = require('./commonMethods.js');
var mongoose = require('mongoose');

var	schema = mongoose.Schema;

var admin = new schema({
	role: {
		type: Number,
		default: 1,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	middleName: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: true
	},
	invCodes: [{type: String}],
	registered: {
		type: Date,
		default: Date.now
	},
	salt: {
		type: String
	},
	hashPassword: {
		type: String,
		required: true,
		set: commonMethods.setPassword
	}
});

admin.methods.encryptData = commonMethods.encryptData;

admin.methods.makeSalt = commonMethods.makeSalt;

admin.methods.passwordIsCorrect = commonMethods.passwordIsCorrect;

admin.methods.generateInviteCode = function(guestWord) {
	var inviteCode = this.encryptData(guestWord);
	this.invCodes.push(inviteCode);
	return inviteCode;
};

admin.statics.createInstance = commonMethods.createInstance;
admin.statics.deleteInstance = commonMethods.deleteInstance;


module.exports = admin;
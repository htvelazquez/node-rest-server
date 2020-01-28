/*
 * User Model
 */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let validRoles = {
	values: ['ADMIN_ROLE', 'USER_ROLE'],
	message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {
		type: String,
		required: [true,'El nombre es necesario']
	},
	email: {
		type: String,
		unique: true,
		required: [true,'El correo es necesario']
	},
	password: {
		type: String,
		required: [true,'La contraseña es requerida']
	},
	image: {
		type: String,
		required: false
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: validRoles
	},
	status: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
});

userSchema.methods.toJSON = function() {
	let usr = this;
	let usrObject = usr.toObject();
	delete usrObject.password;

	return usrObject;
}

userSchema.plugin( uniqueValidator, {
	message: '{PATH} debe ser unico'
});

module.exports = mongoose.model( 'User', userSchema );
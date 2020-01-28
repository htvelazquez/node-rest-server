const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const User = require('../models/user');
const app = express();

app.get('/user', function (req, res) {
	
	let from = req.query.from || 0;
	from = Number(from);

	let limit = req.query.limit || 5;
	limit = Number(limit);

	User.find({ status: true }, 'name email image google')
		.limit(limit)
		.skip(from)
		.exec( (err, users) => {
			if (err){
				return res.status(400).json({
					ok: false,
					message: err
				});
			}

			User.countDocuments({ status: true }, (err, amount) => {
				res.json({
					ok: true,
					amount,
					users
				});

			});

		})

});

app.post('/user', function (req, res) {

	let body = req.body;

	let user = new User({
		name: body.name,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		role: body.role
	});

	user.save( (err, userDB) => {
		if (err){
			return res.status(400).json({
				ok: false,
				message: err
			});
		}

		res.json({
			ok: true,
			user: userDB
		});
	});

});

app.put('/user/:id', function (req, res) {

	let id = req.params.id;
	let body = _.pick(req.body, ['name', 'email', 'image', 'role', 'status'] );
	User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

		if (err){
			return res.status(400).json({
				ok: false,
				message: err
			});
		}

		res.json({
			ok: true,
			user: userDB
		});
	});
});

app.delete('/user/:id', function (req, res) {
	let id = req.params.id;

	let deletedProp = { status: false };

	User.findByIdAndUpdate(id, deletedProp, { new: true }, (err, deletedUser) => {
		if (err){
			return res.status(400).json({
				ok: false,
				message: err
			});
		}

		if (!deletedUser){
			return res.status(400).json({
				ok: false,
				err: {
					message: 'User not found'
				}
			})
		}

		res.json({
			ok: true,
			user: deletedUser
		})
	});

});

module.exports = app;
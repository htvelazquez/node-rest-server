const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const User = require('../models/user');
const app = express();

app.post('/login', (req, res) => {

	let body = req.body;

	User.findOne({ email: body.email }, (err, userDB) => {
		if (err){
			return res.status(500).json({
				ok: false,
				message: err
			});
		}

		if (!userDB || !bcrypt.compareSync(body.password, userDB.password) ) {
			return res.status(400).json({
				ok: false,
				err: {
					message: 'Incorrect user or password'	
				}
			});			
		}

		let token = jwt.sign({ user: userDB }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXPIRATION });

 		res.json({
			ok: true,
			user: userDB,
			token
		})

	});

});

// Google config
async function verify( token ) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();

  return {
  	name: payload.name,
  	email: payload.email,
  	image: payload.picture,
  	google: true

  };
}

app.post('/google', async (req, res) => {
	let token = req.body.idtoken;

	let googleUser = await verify(token).catch( err => {
		return res.status(403).json({
			ok: false,
			err
		});
	});

	User.findOne({email: googleUser.email}, (err, userDB) => {
		if (err){
			return res.status(500).json({
				ok: false,
				err
			});
		}

		if ( userDB ) {
			if (userDB.google === false) {
				return res.status(400).json({
					ok: false,
					err: {
						message: 'You must use regular auth instead of Google Auth'	
					}
				});				
			} else {
				let token = jwt.sign({ user: userDB }, process.env.TOKEN_SEED, { expiresIn: process.env.TOKEN_EXPIRATION });

		 		res.json({
					ok: true,
					user: userDB,
					token
				})
			}
		} else {
			// the user does not exist in our database
			let user = new User();

			user.name = googleUser.name;
			user.email = googleUser.email;
			user.image = googleUser.image;
			user.google = googleUser.google;
			user.password = ':)';

			user.save( (err, userDB) => {
				if (err){
					return res.status(500).json({
						ok: false,
						err
					});
				}

		 		res.json({
					ok: true,
					user: userDB,
					token
				})
			});
		}
	});

});

module.exports = app;
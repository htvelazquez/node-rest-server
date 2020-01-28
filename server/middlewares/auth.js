/*
 * Authentication
 */
const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {

	let token = req.get('Authorization');

	jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				ok: false,
				err: {
					message: 'Invalid Token',
					err
				}
			});
		}

		req.user = decoded.user;
		next();
	});
};

let verifyAdminRole = (req, res, next) => {
	let user = req.user;

	if (user === undefined || user.role !== 'ADMIN_ROLE'){
		return res.status(401).json({
			ok: false,
			err: {
				message: 'Insufficient privileges, you must be an admin'
			}
		});
	}

	next();
}


module.exports = {
	verifyToken,
	verifyAdminRole
}
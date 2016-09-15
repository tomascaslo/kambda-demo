var User = require('../models').User;

var auth = {
	authorized: function(req, res, next) {
		var sessionToken = req.headers['authorization'];

		if (sessionToken && sessionToken.split(' ')[1]){
			sessionToken = sessionToken.split(' ')[1];

			User.findOne({ sessionToken: sessionToken }).then(function(user) {
        if (user) {
          next();
        }
			});
		} else {
			notAuthorizedError(res);
		}
	},
};

function notAuthorizedError(res) {
	res.status(401).send('User not authorized.');
}

module.exports = auth;

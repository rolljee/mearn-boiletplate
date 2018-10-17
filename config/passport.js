const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const config = require('config');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('jwtKey');

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, async (jwtPayload, done) => {
			try {
				const user = await User.findById(jwtPayload.id);
				if (user) return done(null, user);
				return done(null, false);
			} catch (err) {
				console.error(err);
			}
		}),
	);
};

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('config');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get('jwtPrivateKey');

module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, async (jwtPayload, done) => {
			try {
				return done(null, jwtPayload);
			} catch (err) {
				console.error(err);
			}
		}),
	);
};

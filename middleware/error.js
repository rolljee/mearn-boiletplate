const winston = require('winston');

const logger = winston.createLogger();

const config = {
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3,
	},
	colors: {
		error: 'red',
		warn: 'yellow',
		info: 'green',
		debug: 'blue',
	},
};

winston.addColors(config.colors);

logger.add(
	new winston.transports.Console({
		level: 'debug',
		prettyPrint: true,
		format: winston.format.combine(
			winston.format.json(),
			winston.format.timestamp({
				format: 'YYYY-MM-DD HH:mm:ss',
			}),
			winston.format.colorize({ all: true }),
			winston.format.printf(info => `${info.level} ${info.message}`),
		),
	}),
);

(function overrideConsole() {
	console.info = function info(args) {
		logger.info(...args);
	};
}());

module.exports = function middleware(req, res, next) {
	console.log('verbose', req.method, req.url, res.statusCode);
	next();
};

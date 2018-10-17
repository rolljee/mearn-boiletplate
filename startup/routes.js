const express = require('express');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function routesConfiguration(app) {
	app.use(express.json());
	app.use('/api/auth', auth);
	app.use(error);
};

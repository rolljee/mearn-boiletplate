const express = require('express');
const passport = require('passport');

const app = express();


// Startup
// require('./startup/config')();
// require('./startup/db')();
// require('./startup/routes')(app);

// Middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

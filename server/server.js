/*
 * Server Class
 */
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Global config of routes
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB,
				{ useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false },
				(err, res) => {
	if (err) throw err;

	console.log('Base de datos ONLINE');
});

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

app.listen(process.env.PORT, () => {
	console.log('Listening port: ', process.env.PORT);
})
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.connect(config.dbURL);

const app = express();

app.use(express.static('public'));

const schema = new mongoose.Schema({
	nev: String,
	szavazatok: Number
});

const model = mongoose.model('Opciok', schema, 'Opciok');

app.use(express.urlencoded());
app.post('/add_szav', function(request, response) {
	console.log(request.body);
	
	new model ({
		nev: request.body.hawaii,
		szavazatok: 1
	}).save();

	response.redirect('/');
});

app.listen(9000);
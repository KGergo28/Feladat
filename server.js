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
	model.findOne({ nev: request.body.hawaii}, function(err, doc) {
	if (doc) {
		console.log(request.body.hawaii + ' már létezik');

		doc.szavazatok++;
		doc.save();
	} else {
		console.log(request.body.hawaii + ' még nem létezik');
		new model ({
			nev: request.body.hawaii,
			szavazatok: 1
		}).save();
	}
	});
	response.redirect('/stat.html');
});

app.get('/stat', function(req, res){
	model.find({}, function(err, doc){
		res.send(doc);
	});
});

app.listen(9000);
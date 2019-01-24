var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();
var brandsList = [];
var vehiclesList = [];

app.use(bodyParser.json());

app.post('/brands', function(req, res) {
	var brand = {
		brand: req.body.brand
	};
	brandsList.push(brand);
	res.send(brand);
});

app.get('/brands/1', function(req, res) {
	res.send(brandsList[0]);
});

app.post('/vehicles', function(req, res) {
	var vehicle = {
		model: req.body.model,
		color: req.body.color,
		fuel: req.body.fuel,
		year: req.body.year,
		price: req.body.price,
		brandId: req.body.brandId
	};
	vehiclesList.push(vehicle);
	res.send(vehicle);
});

app.get('/brands/1/vehicles', function(req, res) {
	var vehiclesList2 = [];
	for(i in vehiclesList) {
		if(vehiclesList[i].brandId==req.body.brandId) {
			vehiclesList2.push(vehiclesList[i]);
		}
	}
	res.send(vehiclesList);
});

app.get('/brands/1/vehicles/1', function(req, res) {
	res.send(vehiclesList[0]);
});

app.put('/brands/1/vehicles/1', function(req, res) {
	var vehicle = {
		model: req.body.model,
		color: req.body.color,
		fuel: req.body.fuel,
		year: req.body.year,
		price: req.body.price,
		brandId: req.body.brandId
	};
	vehiclesList[0] = vehicle;
	res.send(vehicle);
});

app.delete('/brands/1/vehicles/1', function(req, res) {
	for(i in vehiclesList) {
		if(vehiclesList[i].model==req.body.model) {
			delete vehiclesList[i];
		}
	}
	res.sendStatus(204);
});

console.log('Server Up, Port:', port);
module.exports = app.listen(port);
var should = require('chai').should();
var expect = require('chai').expect;
var supertest = require('supertest');
var server = require('../server.js');

describe('My Api tests', function() {
	
	before(function() {
		console.log('Before Hook -> Post methods, create brands and vehicles');
		
		supertest(server).post('/brands')
		.set('Accept', 'application/json')
		.send({
			'brand': 'Toyota'
		})
		.expect('Content-Type', /json/)
		.expect(201)
		.end(function(err, res) {
			res.body;
		});
		
		// ---------------------------------	
		supertest(server).post('/brands')
		.set('Accept', 'application/json')
		.send({
			'brand': 'Nissan'
		})
		.expect('Content-Type', /json/)
		.expect(201)
		.end(function(err, res) {
			res.body;
		});
		
		// ---------------------------------
		supertest(server).post('/vehicles')
		.set('Accept', 'application/json')
		.send({
			'model': 'Corolla',
			'color': 'White',
			'fuel': 'Gasoline',
			'year': '2003',
			'price': '₡3500000',
			'brandId': 'Toyota'
		})
		.expect('Content-Type', /json/)
		.expect(201)
		.end(function(err, res) {
			res.body;
		});
		
		// ---------------------------------
		supertest(server).post('/vehicles')
		.set('Accept', 'application/json')
		.send({
			'model': 'Yaris',
			'color': 'Red',
			'fuel': 'Gasoline',
			'year': '2000',
			'price': '₡2500000',
			'brandId': 'Toyota'
		})
		.expect('Content-Type', /json/)
		.expect(201)
		.end(function(err, res) {
			res.body;
		});
		
		// ---------------------------------
		supertest(server).post('/vehicles')
		.set('Accept', 'application/json')
		.send({
			'model': 'Sentra',
			'color': 'Blue',
			'fuel': 'Gasoline',
			'year': '2001',
			'price': '₡2200000',
			'brandId': 'Nissan'
		})
		.expect('Content-Type', /json/)
		.expect(201)
		.end(function(err, res) {
			res.body;
		});
		
	});
	
	after(function(done){
		console.log('Server close!');
		server.close(done)
	});
	
	it('http://localhost:3000/brands/1 Get, should return a 200 response', function(done) {
		supertest(server).get('/brands/1')
		.set('Accept', 'application/json')
		.send({
			'brand': 'Toyota'
		})
		.expect(200)
		.end(function(err, res) {
			expect(res.body.brand).to.equal('Toyota');
			done();
		});
	});
	
	it('http://localhost:3000/brands/1/vehicles Get, should return a 200 response', function(done) {
		supertest(server).get('/brands/1/vehicles')
		.set('Accept', 'application/json')
		.send({
			'brandId': 'Toyota'
		})
		.expect(200)
		.end(function(err, res) {
			res.body;
			done();
		});
	});
	
	it('http://localhost:3000/brands/1/vehicles/1 Get, should return a 200 response', function(done) {
		supertest(server).get('/brands/1/vehicles/1')
		.set('Accept', 'application/json')
		.send({
			'brandId': 'Toyota'
		})
		.expect(200)
		.end(function(err, res) {
			expect(res.body.brandId).to.equal('Toyota');
			done();
		});
	});
	
	it('http://localhost:3000/brands/1/vehicles/1 Put, should return a 200 response', function(done) {
		supertest(server).put('/brands/1/vehicles/1')
		.set('Accept', 'application/json')
		.send({
			model: 'Corolla',
			color: 'White and Black',
			fuel: 'Gasoline',
			year: '2005',
			price: '₡4500000',
			brandId: 'Toyota'
		})
		.expect(200)
		.end(function(err, res) {
			done();
		});
	});
	
	it('http://localhost:3000/brands/1/vehicles/1 Delete, should return a 204 response', function(done) {
		supertest(server).delete('/brands/1/vehicles/1')
		.set('Accept', 'application/json')
		.send({
			model: 'Corolla'
		})
		.expect(204)
		.end(function(err, res) {
			done();
		});
	});
	
	// supertest
	it('GET /brands/1 responds with json', function(done) {
		supertest(server)
		.get('/brands/1')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	
	it('POST /vehicles responds with json', function(done) {
		supertest(server)
		.post('/vehicles')
		.send({
			model: 'Yaris',
			color: 'Red',
			fuel: 'Gasoline',
			year: '2000',
			price: '₡2500000',
			brandId: 'Toyota'
		})
		.set('Accept', 'application/json')
		.expect(200)
		.end(function(err, res) {
			if (err) return done(err);
			done();
		});
	});
});
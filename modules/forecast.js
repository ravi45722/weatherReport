var request = require('request');
var async = require('async');
var geoip = require('geoip-lite');

function getForecastDetails (loc, callback) {
	let uri = 'http://openweathermap.org/data/2.5/forecast?q='+loc+'&appid=b1b15e88fa797225412429c1c50c122a1'
	request(uri, ((error, response, body) => {
		if (error) {
			//console.log(err);
			return callback(err,'');
		} else {
			if (response.statusCode == '200') {
				return callback('',JSON.parse(body));
			} else {
				//console.log(body);
				return callback(body,'');
			}
		}
	}))
}

exports.currentLocation = function (req, res, next) {
	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	let geo = geoip.lookup('220.222.38.89');
	getForecastDetails(geo.city, (err, result) => {
		if (err) {
			next(err);
		} else {
			//console.log(result);
			res.send(result);
		}
	})
}

exports.nativeFunction = function (req, res, next) {
	let locations = req.body;
	let counter = 0;
	let res_array = [];
	locations.forEach( (loc) => {
		getForecastDetails(loc, (err, result) => {
			counter++;
			if (err) {
				next(err);
			} else {
				res_array.push(result);
				if (counter == locations.length) {
					res.send(res_array);
				}
			}
		});
	});
}

exports.asyncFunction = function (req, res, next) {
	let locations = req.body;
	async.map(locations, getForecastDetails, ((err, results) => {
		if (err) {
			next(err);
		} else {
			console.log(results);
			res.send(results);
		}
	}));
}
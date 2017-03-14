// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect(''); // connect to our database
var Bear     = require('./app/models/bear');
var Profile     = require('./app/models/profile');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {

		var bear = new Bear();		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});


	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/bears/:bear_id')

	// get the bear with that id
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name;
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});





	router.route('/profiles')

		// create a Profile (accessed at POST http://localhost:8080/Profiles)
		.post(function(req, res) {

			var profile = new Profile();		// create a new instance of the profile model
			profile.name = req.body.name;  // set the profiles name (comes from the request)
			profile.age = req.body.age;
			profile.height = req.body.height;
			profile.education = req.body.education;
			profile.gender = req.body.gender;
			profile.mtongue = req.body.mtongue;  // set the profiles name (comes from the request)
			profile.bodytype = req.body.bodytype;
			profile.languages = req.body.languages;
			profile.complexion = req.body.complexion;
			profile.mstatus = req.body.mstatus;
			profile.pstatus = req.body.pstatus;
			profile.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'profile created!' });
			});


		})

		// get all the profiles (accessed at GET http://localhost:8080/api/profiles)
		.get(function(req, res) {
			Profile.find(function(err, profiles) {
				if (err)
					res.send(err);

				res.json(profiles);
			});
		});

	// on routes that end in /profiles/:profile_id
	// ----------------------------------------------------
	router.route('/profiles/:profile_id')

		// get the profile with that id
		.get(function(req, res) {
			Profile.findById(req.params.profile_id, function(err, profile) {
				if (err)
					res.send(err);
				res.json(profile);
			});
		})

		// update the profile with this id
		.put(function(req, res) {
			Profile.findById(req.params.profile_id, function(err, profile) {

				if (err)
					res.send(err);

				profile.name = req.body.name;
				profile.save(function(err) {
					if (err)
						res.send(err);

					res.json({ message: 'profile updated!' });
				});

			});
		})

		// delete the profile with this id
		.delete(function(req, res) {
			Profile.remove({
				_id: req.params.profile_id
			}, function(err, profile) {
				if (err)
					res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Order = require('./app/models/order');
var Transport = require('./app/models/transport');
var User = require('./app/models/user');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var express = require('express');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// launch app!
app.listen(port, function () {
  console.log('App listening on port ' + port);
});



// ROUTES

app.get('/', function (req, res) {
  console.log('Requesting root...');
  res.send('Hello World!');
});



// API ROUTER

var router = express.Router();
app.use('/api', router);

// middleware to use for all requests
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
  res.send('API working!');
});


// connectiong to db
mongoose.connect('mongodb://admin:admin@ds137891.mlab.com:37891/diploma_db', {
  useMongoClient: true,
  /* other options */
});


// ORDER ROUTER
router.route('/orders')

	// CREATE
	.post(function(req, res) {
		var doc = new Order();
		doc.documentID = req.body.documentID;
		doc.title = req.body.title;
		doc.customer = req.body.customer;
		doc.startLocation = req.body.startLocation;
		doc.endLocation = req.body.endLocation;
		doc.vehicleTypeRequired = req.body.vehicleTypeRequired;
		doc.cargo = req.body.cargo;
		doc.dateDeadline = req.body.dateDeadline;
		doc.transportData = req.body.transportData;
		doc.status = req.body.status;
		doc.successfullyDelivered = req.body.successfullyDelivered;
		
		doc.text = req.body.text;
		doc.items = req.body.items;

		doc.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.json({message: 'Document created!'});
		});

	})

	// GET ALL
	.get(function(req, res) {
		Order.find(function(err, docs) {
			if (err) {
				res.send(err);
			}

			res.json(docs);
		});
	});


router.route('/orders/:order_id')
	
	// GET ONE
	.get(function(req, res) {
		console.log('Requesting order with ID', req.params.order_id);
		Order.findOne({ 'orderID': req.params.order_id }, function(err, doc) {
			if (err) {
				res.send(err);
			}

			res.json(doc);
		});
	})

	// UPDATE
	.put(function(req, res) {
		console.log('Updating order with ID', req.params.order_id);
		Order.findOne({ 'orderID': req.params.order_id }, function(err, doc) {
			if (err) {
				res.send(err);
			}

			// update fields
			doc = req.body;

			// save it
			doc.save(function (err) {
				if (err) {
					res.send(err);
				}

				res.json({ message: 'Order updated!', status: 1 });
			});

			res.json(doc);
		})
	});	




// TRANSPORT ROUTER
router.route('/transports')

	// CREATE -- MISSING BODY!!!!
	.post(function(req, res) {
		var doc = new Transport();
		doc.idOrder = req.idOrder;
		doc.delivered = req.delivered;
		doc.measurements = req.measurements;
		doc.alerts = req.alerts;
		doc.startDate = req.startDate;
		doc.endDate = req.endDate;
		doc.duration = req.duration;
		doc.vehicleType = req.vehicleType;
		doc.vehicleReg = req.vehicleReg;
		doc.driverID = req.driverID;
		doc.text = req.text;

		doc.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.json({message: 'Document created!'});
		});

	})

	// GET ALL
	.get(function(req, res) {
		Transport.find(function(err, docs) {
			if (err) {
				res.send(err);
			}

			res.json(docs);
		});
	});


router.route('/transports/:transport_id')
	
	// GET ONE
	.get(function(req, res) {
		console.log('Requesting order with ID', req.params.transport_id);
		Transport.findOne({ '_id': new ObjectId(req.params.transport_id) }, function(err, doc) {
			if (err) {
				res.send(err);
			}

			res.json(doc);
		});
	})

	// UPDATE
	.put(function(req, res) {
		console.log('Updating order with ID', req.params.order_id);
		Transport.findOne({ 'orderID': req.params.order_id }, function(err, doc) {
			if (err) {
				res.send(err);
			}

			// update fields
			doc = req.body;

			// save it
			doc.save(function (err) {
				if (err) {
					res.send(err);
				}

				res.json({ message: 'Order updated!', status: 1 });
			});

			res.json(doc);
		})
	});	




// USERS ROUTER
router.route('/users')

	// CREATE
	.post(function(req, res) {

		console.log('New user:', req.body);

		var doc = new User();
		doc.email = req.body.email;
		doc.username = req.body.username;
		doc.password = req.body.password;

		console.log('Adding user', doc);

		doc.save(function(err) {
			if (err) {
				res.send(err);
			}

			res.json({message: 'User created!'});
		});

	})

	// GET ALL
	.get(function(req, res) {
		User.find(function(err, docs) {
			if (err) {
				res.send(err);
			}

			res.json(docs);
		});
	});


router.route('/users/auth')

	// AUTHENTICATE USER with email + password
	.post(function(req, res) {

		console.log('Auth', req.body);
		console.log('Email', req.body.email);
		console.log('Password', req.body.password);

		User.findOne({ email: req.body.email })
		    .exec(function (err, user) {
			    if (err) {
			      	return res.send(400, err);
			    } else if (!user) {
		        	return res.send(401, 'User not found.');
			    }
			    
		      	bcrypt.compare(req.body.password, user.password, function (err, result) {
			        if (result === true) {
			         	res.send(user);
			        } else {
			         	res.send(401, 'Wrong password');
			        }
		    	});
	    });

	})
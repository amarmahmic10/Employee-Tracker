//----------------------------------------------------------------------------------
//Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // Get configurations

//----------------------------------------------------------------------------------
//Models
var Employee = require('./app/models/employee'); // Mongoose employees model
var User = require('./app/models/user'); // Mongoose users model
var Departments = require('./app/models/departments'); // Departments model
var Positions = require('./app/models/positions'); // Positions model
var Seminars = require('./app/models/seminars'); // Seminars model
var Tasks = require('./app/models/tasks'); // Tasks model

const port = process.env.PORT || 3000;

mongoose.connect(config.livedb); // Connect to db

//----------------------------------------------------------------------------------
//Uses
app.set('superSecret', config.secret); // secret variable
app.use(bodyParser.urlencoded({extended:false})); // body-parser => we can get info from POST/URL parameters
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app')); // client side


//----------------------------------------------------------------------------------
//Routes
app.get('/', function (req, res) {
	res.sendFile('index.html');
});


//Get an instance of the router for api routes
var apiRoutes = express.Router();

//----------------------------------------------------------------------------------
//Authentication - No Middleware needed
apiRoutes.post('/authenticate', function(req, res){
	var username = req.body.username;
	var enteredPassword = req.body.password;

	User.findOne({username:username}, function(err, users){
		if(err){
			res.send("Request error");
		}
		if(users){
		bcrypt.compare(enteredPassword, users.password, function(err, resp) {
			if(resp===true){
				const payload = {
					//_id: users.id,
					username: users.username,
					firstname: users.firstname,
					lastname: users.lastname,
					admin: users.admin
				};

				
				var token = jwt.sign(payload, app.get('superSecret'), {
					expiresIn : 60*60*24 //24 hours valid token
				});
				res.setHeader("x-access-token", token);
				res.send({
					success: true,
					message: 'Successfully Logged in!',
					admin:payload.admin,
          			token: token
				});

				
			}else{
				res.send({
					success: false,
					message: "Wrong password"
				})
			}
		});
		}else{
			res.send({
				user: false
			})
		}
	});
});

//----------------------------------------------------------------------------------
//MIDDLEWARE FUNCTION
apiRoutes.use(function(req, res, next){

	//Check header/URL/POST parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];

	//Decode token
	if(token){
		// Verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded){			
			if(err){
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			}else{
				// If everything is good, save to request for use in other routes
				req.decoded = decoded;
				//console.log(decoded);	
				next();
			}
		});
	}else{
		// If there is no token
		// Return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
	}
});


//----------------------------------------------------------------------------------
//Authenticated routes


//Get all employees
apiRoutes.get('/employees', function(req, res){
  Employee.find(function(err, employees){
    if(err)
      res.send(err);
    res.json(employees);
  })
});

//Get employee by id
apiRoutes.get('/employees/:id', function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Create new employee
apiRoutes.post('/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Remove selected employee
apiRoutes.delete('/employees/:id', function(req, res){
	Employee.findOneAndRemove({_id:req.params.id}, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Update selected employee
apiRoutes.put('/employees/:id', function(req, res){
	var query = {
		name:req.body.name,
		dept:req.body.dept,
		area:req.body.area,
		status:req.body.status,
		contact:req.body.contact,
		salary:req.body.salary
	};

	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Get all departments
apiRoutes.get('/departments', function(req, res){
	Departments.find(function(err, departmens){
	  if(err)
		res.send(err);
	  res.json(departmens);
	})
});

//Create new department
apiRoutes.post('/departments', function(req, res){
	Departments.create(req.body, function(err, departments){
		if(err)
			res.send(err);
		res.json(departments);
	});
});

//Remove selected departemt
apiRoutes.delete('/departments/:id', function(req, res){
	Departments.findOneAndRemove({_id:req.params.id}, function(err, departments){
		if(err)
			res.send(err);
		res.json(departments);
	});
});

//Get Department by id
apiRoutes.get('/departments/:id', function(req, res){
	Departments.findOne({_id:req.params.id}, function(err, departments){
		if(err)
			res.send(err);
		res.json(departments);
	});
});

//Update selected department
apiRoutes.put('/departments/:id', function(req, res){
	var query = {
		name:req.body.name,
	};

	Departments.findOneAndUpdate({_id:req.params.id}, query, function(err, department){
		if(err)
			res.send(err);
		res.json(department);
	});
});

//Get all positions
apiRoutes.get('/positions', function(req, res){
	Positions.find(function(err, positions){
	  if(err)
		res.send(err);
	  res.json(positions);
	})
});

//Create new positions
apiRoutes.post('/positions', function(req, res){
	Positions.create(req.body, function(err, positions){
		if(err)
			res.send(err);
		res.json(positions);
	});
});

//Remove selected position
apiRoutes.delete('/positions/:id', function(req, res){
	Positions.findOneAndRemove({_id:req.params.id}, function(err, positions){
		if(err)
			res.send(err);
		res.json(positions);
	});
});

//Get position by id
apiRoutes.get('/positions/:id', function(req, res){
	Positions.findOne({_id:req.params.id}, function(err, positions){
		if(err)
			res.send(err);
		res.json(positions);
	});
});

//Update selected position
apiRoutes.put('/positions/:id', function(req, res){
	var query = {
		name:req.body.name,
	};

	Positions.findOneAndUpdate({_id:req.params.id}, query, function(err, t){
		if(err)
			res.send(err);
		res.json(t);
	});
});


//Create new seminar
apiRoutes.post('/seminars', function(req, res){
	var name = req.body.name;
	var topic = req.body.topic;
	var by = req.body.by;
	var date = req.body.date;
	var place = req.body.place;
	var time = req.body.time;


		var seminar = new Seminars({name: name, topic: topic, by: by, date: date, place: place, time:time});
		Seminars.create(seminar, function(err, seminar){
			if(err)
				res.send(err);
			res.json(seminar);
		});
	
});

//Get all seminars
apiRoutes.get('/seminars', function(req, res){
	Seminars.find(function(err, seminars){
	  if(err)
		res.send(err);
	  res.json(seminars);
	})
  });
  
  //Get seminar by id
  apiRoutes.get('/seminars/:id', function(req, res){
	Seminars.findOne({_id:req.params.id}, function(err, seminars){
		  if(err)
			  res.send(err);
		  res.json(seminars);
	  });
  });
  
  //Remove selected seminar
  apiRoutes.delete('/seminars/:id', function(req, res){
	Seminars.findOneAndRemove({_id:req.params.id}, function(err, seminars){
		  if(err)
			  res.send(err);
		  res.json(seminars);
	  });
  });
  
  //Update selected seminar
  apiRoutes.put('/seminars/:id', function(req, res){
	
	  var query = {
		name : req.body.name,
	    topic : req.body.topic,
		by : req.body.by,
		date : req.body.date,
		place : req.body.place,
		time : req.body.time
	  };
  
	  Seminars.findOneAndUpdate({_id:req.params.id}, query, function(err, seminars){
		  if(err)
			  res.send(err);
		  res.json(seminars);
	  });
  });

//Create new task
apiRoutes.post('/tasks', function(req, res){
	var task = req.body.task;
	var deadline = req.body.deadline;
	var department = req.body.department;
	var description = req.body.description;

		var task = new Tasks({task: task, deadline: deadline, department: department, description: description});
		Tasks.create(task, function(err, task){
			if(err)
				res.send(err);
			res.json(task);
		});
	
});

//Get all tasks
apiRoutes.get('/tasks', function(req, res){
	Tasks.find(function(err, tasks){
	  if(err)
		res.send(err);
	  res.json(tasks);
	})
  });
  
  //Get task by id
  apiRoutes.get('/tasks/:id', function(req, res){
	Tasks.findOne({_id:req.params.id}, function(err, task){
		  if(err)
			  res.send(err);
		  res.json(task);
	  });
  });
  
  //Remove selected task
  apiRoutes.delete('/tasks/:id', function(req, res){
	Tasks.findOneAndRemove({_id:req.params.id}, function(err, task){
		  if(err)
			  res.send(err);
		  res.json(task);
	  });
  });
  
  //Update selected task
  apiRoutes.put('/tasks/:id', function(req, res){
	
	  var query = {
		 task : req.body.task,
 		 deadline : req.body.deadline,
		 department : req.body.department,
		 description : req.body.description
	  };
  
	  Tasks.findOneAndUpdate({_id:req.params.id}, query, function(err, task){
		  if(err)
			  res.send(err);
		  res.json(task);
	  });
  });

//Create new user
apiRoutes.post('/users', function(req, res){
	var username = req.body.username;
	var firstname = req.body.fname;
	var lastname = req.body.lname;
	var admin = false;
	if(req.body.role == "Admin"){
		admin = true;
	}
	
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		var user = new User({username: username, password: hash, firstname: firstname, lastname: lastname, admin: admin});
		User.create(user, function(err, users){
			if(err)
				res.send(err);
			res.json(users);
		});
	});
});

//Get all users
apiRoutes.get('/users', function(req, res){
  User.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  })
});


//Get user by id
apiRoutes.get('/users/:id', function(req, res){
	User.findOne({_id:req.params.id}, function(err, users){
		if(err)
			res.send(err);
		res.json(users);
	});
});

//Remove selected user
apiRoutes.delete('/users/:id', function(req, res){
	User.findOneAndRemove({_id:req.params.id}, function(err, users){
		if(err)
			res.send(err);
		res.json(users);
	});
});

//Update selected user
apiRoutes.put('/users/:id', function(req, res){
	var admin = false;
	if(req.body.role == "Admin"){
		admin = true;
	}
	var query = {
		username:req.body.username,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
		admin:admin
	};

	User.findOneAndUpdate({_id:req.params.id}, query, function(err, users){
		if(err)
			res.send(err);
		res.json(users);
	});
});

app.use('/api', apiRoutes);

//----------------------------------------------------------------------------------
//Start server

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});

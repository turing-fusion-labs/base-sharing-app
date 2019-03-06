//EXpress Config
var express = require('express'),
    app = express(),
    Datastore = require('nedb'),
    bodyParser = require('body-parser');

//Database config
var User = new Datastore();
var Item = new Datastore();

var admin = {
  username: 'admin',
  password: 'admin'
};

//Initial Data setup
User.insert(admin, function(err, user) {
  console.log('Inserted', user.username, 'with ID', user._id);
});

//EJS
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(7000);


/*

INFO: This is first navigation method () for your application

It means a '/' after localhost:7000 will take you to pages/login page.

*/
app.get('/', function(req, res) {
  res.render('pages/login');
});



/*

INFO: This is 2nd navigation method () for your application

It means a '/login' error after localhost:7000 will take you to pages/login with message "Invalid user name or password"
It means a '/login' success after localhost:7000 will take you to pages/dashboard page.

*/

app.get('/login', function(req, res) {
  User.findOne({username:req.query.username,password:req.query.password}, function(err, user) {         // Check if user name and password is correct
    if (err || user == null) {                              // If there is error or user in null
      res.render('pages/login', {                           // Go to page pages/login
        message: "Invalid user name or password"            // with message "Invalid user name or password"
      });
    }
    res.locals.user = user;                                 // If no error , means successfull login
    Item.find({}, function(err, items) {                    // Get the list of current Items in the system
      if(err)                                               // If there is an error, then let item list be blank (no items to select)
        items = [];
      res.render('pages/dashboard', {                       // Go to Page pages/dashboard
        items: items
      });
    });
  });
});


/** Add other navigations methods here for your application : Look at the examples above for reference
Tip: Everytime you have to move from one page to another you should and a new method a new app.get()

*/


console.log('RESTful API server started on: ' + 7000);  // This is example of logging message in the console (black screen)

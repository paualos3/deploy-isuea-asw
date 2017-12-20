//Initialize our Express Web framework.
var express = require('express');
var app = express();

//native NodeJS module for resolving paths
var path = require('path')

//get our port # from c9's enviromental variable: PORT
var port = process.env.PORT;

//Set our view engine to EJS, and set the directory our views will be stored in
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'client', 'views'));

//serve static files from client folder.
//ex: libs/bootstrap/bootstrap.css in our html actually points to client/libs/bootstrap/bootstrap.css
app.use(express.static(path.resolve(__dirname, 'client')));

//set our first route
app.get('/', function(req, res){
    res.render('index.ejs');
})

app.get('/home', function(req,res){ res.render('index.ejs'); }); 
app.get('/about', function(req,res){ res.render('index.ejs'); }); 
app.get('/contact', function(req,res){ res.render('index.ejs'); }); 
app.get('/issues', function(req,res){ res.render('index.ejs'); }); 
app.get('/issues/new', function(req,res){ res.render('index.ejs'); }); 

//make our app listen for incoming requests on the port assigned above
app.listen(port, function(){
    console.log('SERVE RUNNING..... PORT: ' + port);
})
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//to create the app
var app = express();

//to support partials
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//add middleware
//takes absolute path


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// })


app.use(express.static(__dirname + '/public'));

//set up a partial name of helper and function to run
hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//http route handlers
//to set a handler for a http get request
//two arguments, first is request, the second is response
//request stores tons of info about the req coming in, like headers, path, body info
//response has a bunch of methods, can respond to the http reqeust in many diff ways
app.get('/',(req,res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Joao',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  })
});

app.get('/about', (req,res) => {
  //helps you render the templates
  //static page rendering
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad  - send back json data with errorMessage
app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});



//this is gonna bind the app to a port in our machine
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
//this never stops, bc it is waiting for requests
//open tab, localhost:3000

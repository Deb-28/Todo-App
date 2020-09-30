var express = require('express');
var todocontroller = require('./controllers/todocontroller');
var app = express();

//View engine
app.set('view engine','ejs');

//Static files
app.use(express.static('./public'));

//fire controllers
todocontroller(app);


//Listen to port
//localhost IP address:127.0.0.1:3000/todo
port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`You are listening to port ${port}`));
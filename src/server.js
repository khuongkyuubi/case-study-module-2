const connectDB = require('./config/db');
const express = require('express');
const path = require('path');
const {engine, create} = require('express-handlebars');
const bodyparser = require('body-parser');
require("dotenv").config();
const employeeRouter = require('./routes/employeeRouter');
const methodOverride = require("method-override");



//setup port
const port = process.env.PORT || 4000;
//connect to DB
connectDB();

const app = express();


// setup method override
app.use(methodOverride("_method"));

// setup body parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));



//setup helper for handlebars
const hbs = create({



})


//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "views", "layouts")
}));
app.set('view engine', 'hbs');


//setup middleware to use static (public) files
app.use(express.static(path.join(__dirname, "public")))

//get index
app.get("/", (req, res) => {
    res.json("Hello world!")
})


//setup router
app.use('/employee', employeeRouter);


// setup listen port
app.listen(port, () => {
    console.log('Express server started at port : ', port);
});

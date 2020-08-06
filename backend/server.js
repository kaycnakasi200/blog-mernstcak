const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()

// bring routes
const blogRoutes = require('./routes/blog');

const mongoose = require('mongoose');
mongoose
    .connect(process.env.DATBASE_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('DB connected'));

//app
const app = express();


//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


//cors
if (process.env.NODE_ENV === 'devlopment') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//app.use(express.json())
//app.use(express.urlencoded({extended:true}));


//routes midlleware
app.use('/api', blogRoutes);


//port
const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`Server runing http://localhost`);
    console.log(`http://localhost:${port}`);
});
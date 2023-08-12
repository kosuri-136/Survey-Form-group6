require("dotenv").config();
require('./config/db.connect')
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const themeRouter = require('./routes/themeroute');
const userRouter = require('./routes/userroute');
const surveyRouter = require('./routes/surveyroute');
const quesRouter = require('./routes/questionroute')
const middleware = require('./middleware');
const jwt = require('jsonwebtoken');

const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/" , themeRouter)
app.use("/" , userRouter)
app.use("/" , surveyRouter)
// app.use("/surveys", surveyRouter);
app.use("/", middleware);
app.use("/" , quesRouter)
app.get('/' , (req , res)=>{
    res.send("hello")
})

app.listen(3003 , ()=>{
    console.log(`App is listening at 3003`);
})

module.exports = app;



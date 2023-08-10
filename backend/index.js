const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
//mongoose connection

mongoose.connect("mongodb+srv://kosuriravikanth:Mongo553136@cluster0.cvvip5o.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
        console.log('Connected to mongodb')
    }).catch((err)=>{
        console.log(err)
    })



app.listen(3003, (err) => {
    if (!err) {
        console.log("server is running")
    } else {
        console.log(err)
    }
})


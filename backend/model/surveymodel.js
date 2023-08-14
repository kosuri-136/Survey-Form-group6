const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({
    email:String,
    name:String,
    description:String,
    surveyType:String,
    othercriteria:String,
    image:String,
    startDate:String,
    endDate:String
},{
    timestamps:true
})

module.exports =new mongoose.model('survey' , surveySchema)

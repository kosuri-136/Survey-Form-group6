const mongoose = require('mongoose');

const quesSchema = new mongoose.Schema({
  email: String,
  surveyId: String,
  questionText: String,
  option: Array
});

const quesModel = mongoose.model('ques', quesSchema);

module.exports = quesModel;

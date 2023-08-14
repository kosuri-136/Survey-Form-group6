const express = require('express');
const quesRouter = express.Router();
const quesModel = require('../model/questionmodel');

// Create a new question
quesRouter.post('/ques', async (req, res) => {
  try {
    const { email, surveyId, questionText, option } = req.body;
    
    const newQues = new quesModel({
      email,
      surveyId,
      questionText,
      option,
    });

    const result = await newQues.save();

    res.status(200).json({
      status: 'Success',
      message: 'MCQ question created successfully',
      mcq: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 'Failed',
      message: err.message,
    });
  }
});

// Get all questions
quesRouter.get('/ques', async (req, res) => {
  try {
    const allQuestions = await quesModel.find();
    res.status(200).json({
      status: 'Success',
      result: allQuestions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions by surveyId
quesRouter.get('/ques/:surveyId', async (req, res) => {
  const surveyId = req.params.surveyId;
  try {
    const questions = await quesModel.find({ surveyId: surveyId });
    res.status(200).json({
      status: 'Success',
      result: questions,
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err.message,
    });
  }
});

module.exports = quesRouter;

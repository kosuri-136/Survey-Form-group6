const express = require('express');
const quesRouter = express.Router();
const quesModel = require('../model/questionmodel');

quesRouter.post('/ques', async (req, res) => {
  try {
    const { email, surveyId, questionText, option } = req.body;

    console.log(req.body);

    const newQues = new quesModel({
      email,
      surveyId,
      questionText,
      option,
    });

    const result = await newQues.save();

    console.log(result);
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
quesRouter.get('/ques', async (req, res) => {
  try {
    let allTheme = await quesModel.find()
    res.status(200).json({
      status:"Success",
      result : allTheme
  })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

quesRouter.get('/ques/:surveyId', async (req, res) => {
  const surveyId = req.params.surveyId;
  try {
    const ques = await quesModel.find({ surveyId: surveyId });
console.log(ques);
    res.status(200).json({
      status: "Success",
      result: ques
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message
    });
  }
});

module.exports = quesRouter;

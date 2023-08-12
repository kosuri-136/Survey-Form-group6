const express = require('express');
const themeRouter = express.Router();
const Theme = require('../model/thememodel');

themeRouter.get('/themes', async (req, res) => {
    try {
      let allTheme = await Theme.find()
      res.status(200).json({
        status:"Success",
        result : allTheme
    })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  themeRouter.post('/themes', async (req, res) => {
    console.log(req.body);
    try {
      const {
        email,
        surveyName,
        themeOpt,
        themeName,
        themeType,
        fromType,
        allQuestionMandatory,
        enableSkip,
        optionType,
        font,
        color
      } = req.body;
  
      const existingTheme = await Theme.findOne({ email, surveyName });
  
      if (existingTheme) {
        existingTheme.themeOpt = themeOpt;
        existingTheme.themeName = themeName;
        existingTheme.themeType = themeType;
        existingTheme.fromType = fromType;
        existingTheme.allQuestionMandatory = allQuestionMandatory;
        existingTheme.enableSkip = enableSkip;
        existingTheme.optionType = optionType;
        existingTheme.font = font;
        existingTheme.color = color;
  
        const updatedTheme = await existingTheme.save();
        res.status(200).json(updatedTheme);
      } else {
        const newTheme = new Theme({
          email,
          surveyName,
          themeOpt,
          themeName,
          themeType,
          fromType,
          allQuestionMandatory,
          enableSkip,
          optionType,
          font,
          color
        });
  
        const savedTheme = await newTheme.save();
        res.status(201).json(savedTheme);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  themeRouter.post('/theme', async (req, res) => {
    // console.log("hello");
    try {
      const { email , surveyName} = req.body;
  
      const existingTheme = await Theme.findOne({ email, surveyName });
      console.log(existingTheme);
      if (existingTheme) {
        res.status(200).json(existingTheme);
      } else {
        res.status(404).send("not  found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = themeRouter;

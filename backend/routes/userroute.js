const express = require('express');
const userRouter = express.Router();
const userModel = require('../model/usermodel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


userRouter.post('/signup', async (req, res) => {
    console.log(req.body);
    const { name, email, phoneNumber, profession, password } = req.body;

    if (!name || !email || !phoneNumber || !profession || !password) {
        return res.status(400).send('Insufficient Data');
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).send('User with this email already exists. Please login.');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const new_student = new userModel({
            name,
            email,
            phoneNumber,
            profession,
            password: hashedPassword, // Store the hashed password
        });

        const result = await new_student.save();

        res.status(201).send(result, 'Successfully registered');
    } catch (err) {
        console.error(`Error inserting data: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});


const SECRETKEY = 'jwtSecret';

userRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Insufficient Data');
    }
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password); // Compare hashed password

            if (passwordMatch) {
                const token = jwt.sign({ userId: user._id }, SECRETKEY); // Use userId as payload
                res.status(202).send({ token });
            } else {
                res.status(401).send('Incorrect Password');
            }

        } 
        else {
            res.status(404).send('No user Found');
        }
    } catch (err) {
        console.error(`Error inserting data: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = userRouter;

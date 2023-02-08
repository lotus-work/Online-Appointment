const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');

const User = require('../models/user');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)

    } catch (err) {
        res.send('Error ' + err);
    }
})

// GET PUBLIC USER DATA
router.get('/get/public/:userName', async (req, res) => {
    try {
        const user = await User.find({ username: req.params.userName });
        res.json(user)

    } catch (err) {
        res.send('Error ' + err);
    }
})

// ADD A USER
router.post('/signup', async (req, res) => {

    try {
        // Pre User if already exist or not

        const userEmailExist = await User.findOne({ emailAddress: req.body.emailAddress });

        if (!userEmailExist) {
            const user = new User({
                username: req.body.username,
                fullName: req.body.fullName,
                emailAddress: req.body.emailAddress,
                password: req.body.password,
                timezone: req.body.timezone
            })
            await user.save();
            return res.json([{ success: true, message: 'User added successfully' }]);
        }
        else {
            return res.json([{ success: false, message: 'Email Address already exists' }]);
        }

    } catch (error) {
        return res.status(500).json([{ success: false, message: error.toString() }]);
    }
});

// CHECK USERNAME AVAILABLITY
router.post('/usernameCheck', async (req, res) => {

    try {

        const userEmailExist = await User.findOne({ username: req.body.username });

        if (!userEmailExist) {
            return res.json({ success: true, message: 'Username Available' });
        }
        else {
            return res.json({ success: false, message: 'Username already exists' });
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.toString() });
    }
});

// EMAIL AND PASSWORD ON MATCH

router.post('/signin', async (req, res) => {
    try {
        const userExists = await User.findOne({ emailAddress: req.body.emailAddress, password: req.body.password });

        if (userExists) {
            return res.status(200).send([userExists]);
        }
        else {
            return res.status(200).json([]);
        }
    } catch (err) {
        return res.status(500).json([{ success: false, message: error.toString() }]);
    }
})

//  UPDATE USER PROFILE PICTURE
router.patch('/update/profilePicture/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.profilePicture = req.body.profilePicture;
        const u1 = await user.save();

        res.status(200).json(true);

    } catch (err) {
        return res.status(500).json([{ success: false, message: error.toString() }]);
    }

});

//  UPDATE USER DATA
router.put('/update/userData/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.fullName = req.body.fullName;
        user.password = req.body.password;
        user.about = req.body.about;
        user.timezone = req.body.timezone;

        const u1 = await user.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }

});


// GET USER BY ID
router.get('/get/userDataById/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json([user]);

    } catch (err) {
        return res.status(500).json([{ success: false, message: error.toString() }]);
    }
})

// GET USER BY USERNAME
router.get('/get/userDataByUsername/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.json([user]);

    } catch (err) {
        return res.status(500).json([{ success: false, message: error.toString() }]);
    }
})

// GET USER BY EMAIL
router.get('/get/userDataByEmail/:email', async (req, res) => {
    try {
        const user = await User.findOne({ emailAddress: req.params.email });
        res.json([user]);

    } catch (err) {
        return res.status(500).json([{ success: false, message: error.toString() }]);
    }
})

// VALIDATE USER EMAIL ADDRESS
router.put('/validateUserEmail/:email', async (req, res) => {
    try {
        const user = await User.findOne({ emailAddress: req.params.email });

        var pass = randomstring.generate({
            length: 12,
            charset: 'alphabetic'
        });

        user.password = pass;
        const u1 = await user.save();

        res.status(200).json(true);

    } catch (err) {
        return res.status(500).json([{ success: false, message: error.toString() }]);
    }
})




module.exports = router;
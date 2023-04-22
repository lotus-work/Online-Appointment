const express = require('express');
const router = express.Router();
const randomstring = require('randomstring');

const User = require('../models/user');
const Availablity = require('../models/availability');
const Event = require('../models/event');


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
        const user = await User.find({
            username: req.params.userName
        });
        res.json(user)

    } catch (err) {
        res.send('Error ' + err);
    }
})

// ADD A USER
router.post('/signup', async (req, res) => {

    try {
        // Pre User if already exist or not

        const userEmailExist = await User.findOne({
            emailAddress: req.body.emailAddress
        });

        if (!userEmailExist) {
            const user = new User({
                username: req.body.username,
                fullName: req.body.fullName,
                emailAddress: req.body.emailAddress,
                password: req.body.password,
                timezone: req.body.timezone
            })
            await user.save();
            return res.json([{
                success: true,
                message: 'User added successfully'
            }]);
        } else {
            return res.json([{
                success: false,
                message: 'Email Address already exists'
            }]);
        }

    } catch (error) {
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
    }
});

// CHECK USERNAME AVAILABLITY
router.post('/usernameCheck', async (req, res) => {

    try {

        const userEmailExist = await User.findOne({
            username: req.body.username
        });

        if (!userEmailExist) {
            return res.json({
                success: true,
                message: 'Username Available'
            });
        } else {
            return res.json({
                success: false,
                message: 'Username already exists'
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.toString()
        });
    }
});

// EMAIL AND PASSWORD ON MATCH

router.post('/signin', async (req, res) => {
    try {
        const userExists = await User.findOne({
            emailAddress: req.body.emailAddress,
            password: req.body.password
        });

        if (userExists) {
            return res.status(200).send([userExists]);
        } else {
            return res.status(200).json([]);
        }
    } catch (err) {
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
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
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
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


//  UPDATE USER DATA ONBOARDING
router.put('/update/onboarding/userData/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.about = req.body.about;
        user.timezone = req.body.timezone;

        const u1 = await user.save();



        res.status(200).json(true);

        // AVAILABILTY SET
        const availability = new Availablity({
            availabilityName: "Working Hours",
            userId: req.params.id,
            timezone: req.body.timezone,
            weeksAvailability: '[{"id":1,"aria_controls":"panelsStayOpen-collapseOne","arial_abelledby":"panelsStayOpen-headingOne","week_name":"Monday","status":true,"available_timings":[{"id":1,"start_time":"09:00 AM","end_time":"17:00 PM"}]},{"id":2,"aria_controls":"panelsStayOpen-collapseTwo","arial_abelledby":"panelsStayOpen-headingTwo","week_name":"Tuesday","status":true,"available_timings":[{"id":1,"start_time":"09:00 AM","end_time":"17:00 PM"}]},{"id":3,"aria_controls":"panelsStayOpen-collapseThree","arial_abelledby":"panelsStayOpen-headingThree","week_name":"Wednesday","status":true,"available_timings":[{"id":1,"start_time":"09:00 AM","end_time":"17:00 PM"}]},{"id":4,"aria_controls":"panelsStayOpen-collapseFour","arial_abelledby":"panelsStayOpen-headingFour","week_name":"Thursday","status":true,"available_timings":[{"id":1,"start_time":"09:00 AM","end_time":"17:00 PM"}]},{"id":5,"aria_controls":"panelsStayOpen-collapseFive","arial_abelledby":"panelsStayOpen-headingFive","week_name":"Friday","status":true,"available_timings":[{"id":1,"start_time":"09:00 AM","end_time":"17:00 PM"}]},{"id":6,"aria_controls":"panelsStayOpen-collapseSix","arial_abelledby":"panelsStayOpen-headingSix","week_name":"Saturday","status":true,"available_timings":[]},{"id":7,"aria_controls":"panelsStayOpen-collapseSeven","arial_abelledby":"panelsStayOpen-headingSeven","week_name":"Sunday","status":false,"available_timings":[{"id":1,"start_time":"09:00 AM","end_time":"17:00 PM"}]}]'
        })

        await availability.save()
            .then(async savedDoc => {
                console.log(`Saved document with _id: ${savedDoc._id}`);
                // EVENT SET 15 mins
                const event = new Event({
                    userId: req.params.id,
                    title: "15 mins Meeting",
                    url: "15minsMeetings",
                    length: 15,
                    availabilityId: savedDoc._id,
                    description: "We can discuss anything, that might need my assistance, inputs or feedback! Feel free to talk with me. Looking forward to speak.",
                    location: "Google Meet",
                    eventName: "15 mins Meeting",
                    optInBooking: "Yes",
                    disableGuests: "No",
                    hideEventType: "No",
                    timeSlotIntervals: 0
                })
                await event.save();
            })
            .catch(error => {
                console.error(error);
            });



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
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
    }
})

// GET USER BY USERNAME
router.get('/get/userDataByUsername/:username', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.params.username
        });
        res.json([user]);

    } catch (err) {
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
    }
})

// GET USER BY EMAIL
router.get('/get/userDataByEmail/:email', async (req, res) => {
    try {
        const user = await User.findOne({
            emailAddress: req.params.email
        });
        res.json([user]);

    } catch (err) {
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
    }
})

// VALIDATE USER EMAIL ADDRESS
router.put('/validateUserEmail/:email', async (req, res) => {
    try {
        const user = await User.findOne({
            emailAddress: req.params.email
        });

        var pass = randomstring.generate({
            length: 12,
            charset: 'alphabetic'
        });

        user.password = pass;
        const u1 = await user.save();

        res.status(200).json(true);

    } catch (err) {
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
    }
})




module.exports = router;
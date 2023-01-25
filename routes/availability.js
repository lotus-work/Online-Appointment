const express = require('express');
const router = express.Router();

const Availablity = require('../models/availability');

// ALL AVAILIBITY BY USERID
router.get('/get/all/:userId', async (req, res) => {
    try {
        const availability = await Availablity.find({ userId: req.params.userId });
        res.json(availability)

    } catch (err) {
        res.send('Error ' + err);
    }
})

// ALL AVAILIBITY BY USERID && AVAIBILITY ID
router.get('/get/all/:userId/:availabilityId', async (req, res) => {
    try {
        const availability = await Availablity.find({ userId: req.params.userId, _id: req.params.availabilityId });
        res.json(availability)

    } catch (err) {
        res.send('Error ' + err);
    }
})



// ADD A AVAILIBITY
router.post('/add', async (req, res) => {

    try {

        const availability = new Availablity({
            availabilityName: req.body.availabilityName,
            userId: req.body.userId,
            timezone: req.body.timezone
        })
        await availability.save();
        return res.json([{ success: true, message: 'Availablity added successfully' }]);


    } catch (error) {
        return res.status(500).json([{ success: false, message: error.toString() }]);
    }
});


//  UPDATE AVAILIBITY
router.put('/update', async (req, res) => {
    try {
        const availability = await Availablity.findById(req.body.availabilityId);
        availability.availabilityName = req.body.availabilityName;
        availability.userId = req.body.userId;
        availability.weeksAvailability = req.body.weeksAvailability;
        availability.timezone = req.body.timezone;

        const a1 = await availability.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }

});


// DELETE AVAILIBITY
router.delete('/delete/:userId/:availabilityId', async (req, res) => {
    try {
        const availability = await Availablity.findOne({
            _id: req.params.availabilityId,
            userId: req.params.userId
        });


        const a1 = await availability.remove();
        res.status(200).json(true);

    } catch (err) {
        res.status(200).json('Error ' + err);
    }
})

module.exports = router;
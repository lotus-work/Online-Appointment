const express = require('express');
const router = express.Router();

const Event = require('../models/event');


// GET PUBLIC USER AVAILIBITY
router.get('/get/public/:userId/:url', async (req, res) => {
    try {
        const event = await Event.find({
            userId: req.params.userId,
            url: req.params.url
        });
        res.json(event);

    } catch (err) {
        res.send('Error ' + err);
    }
})

// ALL EVENT BY USERID
router.get('/get/all/:userId', async (req, res) => {
    try {
        const event = await Event.find({
            userId: req.params.userId
        });
        res.json(event)

    } catch (err) {
        res.send('Error ' + err);
    }
})

// ALL EVENT BY USERID && EVENT ID
router.get('/get/all/:userId/:eventId', async (req, res) => {
    try {
        const event = await Event.find({
            userId: req.params.userId,
            _id: req.params.eventId
        });
        res.json(event)

    } catch (err) {
        res.send('Error ' + err);
    }
});


// ADD A EVENT
router.post('/add', async (req, res) => {

    try {

        const event = new Event({
            userId: req.body.userId,
            title: req.body.title,
            url: req.body.url,
            length: req.body.length,
            availabilityId: req.body.availabilityId,
            description: req.body.description,
            location: req.body.location,

            optInBooking: "No",
            disableGuests: "Yes",
            hideEventType: "No",
            timeSlotIntervals: 0
        })
        await event.save();
        return res.json([{
            success: true,
            message: 'Event added successfully'
        }]);


    } catch (error) {
        return res.status(500).json([{
            success: false,
            message: error.toString()
        }]);
    }
});

//  UPDATE AVAILIBITY
router.put('/update', async (req, res) => {
    try {
        const event = await Event.findById({
            _id: req.body.eventId
        });
        event.title = req.body.title;
        event.description = req.body.description;
        event.location = req.body.location;
        event.url = req.body.url;
        event.length = req.body.length;
        event.availabilityId = req.body.availabilityId;
        event.eventName = req.body.eventName;
        event.optInBooking = req.body.optInBooking;
        event.disableGuests = req.body.disableGuests;
        event.hideEventType = req.body.hideEventType;
        event.timeSlotIntervals = req.body.timeSlotIntervals;


        const e1 = await event.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});


// DELETE EVENT
router.delete('/delete/:userId/:eventId', async (req, res) => {
    try {
        const event = await Event.findOne({
            _id: req.params.eventId,
            userId: req.params.userId
        });


        const e1 = await event.remove();
        res.status(200).json(true);

    } catch (err) {
        res.status(200).json('Error ' + err);
    }
})


module.exports = router;
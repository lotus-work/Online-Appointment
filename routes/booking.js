const express = require('express');
const router = express.Router();

const Booking = require('../models/booking');

// GET ALL BOOOKING BY USERNAME
router.get('/get/booking/:userName', async(req,res)=>{
    try {
        const booking = await Booking.find({ bookedUser: req.params.userName});
        res.json(booking);

    } catch (err) {
        res.send('Error ' + err);
    }
})

// ADD A BOOKING
router.post('/add', async (req, res) => {

    try {

        const booking = new Booking({
            bookedUser: req.body.bookedUser,
            bookedEventId: req.body.bookedEventId,
            bookedEventName: req.body.bookedEventName,
            bookedTime: req.body.bookedTime,
            appointmentBookedUsername: req.body.appointmentBookedUsername,
            appointmentBookedPhoneNumber: req.body.appointmentBookedPhoneNumber,
            appointmentBookedEmail: req.body.appointmentBookedEmail,
            appointmentBookedPhoneNumber: req.body.appointmentBookedPhoneNumber,
            appointmentGuestEmail: req.body.appointmentGuestEmail,
            additionalNotes: req.body.additionalNotes,
            sendConfirmationMail: req.body.sendConfirmationMail,
            bookingStatus: req.body.bookingstatus
            
        })
        await booking.save();
        return res.json([{ success: true, message: 'Booking added successfully' }]);


    } catch (error) {
        return res.status(500).json([{ success: false, message: error.toString() }]);
    }
});

//  UPDATE BOOKING ON ConfirmationMailMeeting
router.put('/update/confirmationMailMeeting', async (req, res) => {
    try {
        const booking = await Booking.findById({_id: req.body.bookingId });
        console.log(booking);
        booking.sendConfirmationMail  = "Sent";

        const b1 = await booking.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});

//  UPDATE BOOKING ON CONFIRM
router.put('/update/onConfirm', async (req, res) => {
    try {
        const booking = await Booking.findById({_id: req.body.bookingId });
        console.log(booking);
        booking.bookingStatus  = "Confirmed";


        const b1 = await booking.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});

//  UPDATE BOOKING ON REJECT
router.put('/update/onReject', async (req, res) => {
    try {
        const booking = await Booking.findById({_id: req.body.bookingId });
        booking.bookingStatus  = "Cancelled";


        const b1 = await booking.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});

//  UPDATE BOOKING ON RESCHEDULE
router.put('/update/onReschedule', async (req, res) => {
    try {
        const booking = await Booking.findById({_id: req.body.bookingId });
        booking.bookingStatus  = "Rescheduled";
        

        const b1 = await booking.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});

//  UPDATE BOOKING ON COMPLETE
router.put('/update/onComplete', async (req, res) => {
    try {
        const booking = await Booking.findById({_id: req.body.bookingId });
        booking.bookingStatus  = "Completed";
        
        const b1 = await booking.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});

//  UPDATE BOOKING ON CANCEL
router.put('/update/onCancel', async (req, res) => {
    try {
        const booking = await Booking.findById({_id: req.body.bookingId });
        booking.bookingStatus  = "Cancelled";
        

        const b1 = await booking.save();

        res.status(200).json(true);

    } catch (err) {
        res.status(502).send('Error ' + err);
    }
});

module.exports = router;
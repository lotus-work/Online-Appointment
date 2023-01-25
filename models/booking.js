const mongoose = require('mongoose');

const bookingSchema =  new mongoose.Schema({
    bookedUser:{
        type:String,
        required: false
    },
    bookedEventId:{
        type:String,
        required: false
    },
    bookedEventName:{
        type:String,
        required: false
    },
    bookedTime:{
        type:String,
        required: false
    },
    appointmentBookedUsername:{
        type:String,
        required: false
    },
    appointmentBookedPhoneNumber:{
        type:String,
        required: false
    },
    appointmentBookedEmail:{
        type:String,
        required: false
    },
    appointmentGuestEmail:{
        type:String,
        required: false
    },
    additionalNotes:{
        type:String,
        required: false
    },
    sendConfirmationMail:{
        type:String,
        required: false
    },
    bookingStatus:{
        type:String,
        required: false
    }
});


bookingSchema.set('timestamps', true);
module.exports = mongoose.model('Booking', bookingSchema);
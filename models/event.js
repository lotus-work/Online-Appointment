const mongoose  = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: false
    },
    title:{
        type:String,
        required: false
    },
    url:{
        type:String,
        required: false
    },
    description:{
        type:String,
        required: false
    },
    length:{
        type:Number,
        required: false
    },
    availabilityId:{
        type:String,
        required: false
    },
    eventName:{
        type:String,
        required: false
    },
    location:{
        type:String,
        required: false
    },
    optInBooking:{
        type:String,
        required: false
    },
    disableGuests:{
        type:String,
        required: false
    },
    hideEventType:{
        type:String,
        required: false
    },
    timeSlotIntervals:{
        type:Number,
        required: false
    },
}, { versionKey: false })

eventSchema.set('timestamps', true);
module.exports = mongoose.model('Events', eventSchema);
const mongoose  = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    availabilityName:{
        type:String,
        required: false
    },
    userId:{
        type:String,
        required: false
    },
    weeksAvailability:{
        type:String,
        required:false,
        default: "[{\"id\":1,\"aria_controls\":\"panelsStayOpen-collapseOne\",\"arial_abelledby\":\"panelsStayOpen-headingOne\",\"week_name\":\"Monday\",\"status\":true,\"available_timings\":[{\"id\":1,\"start_time\":\"09:00 AM\",\"end_time\":\"17:00 PM\"}]},{\"id\":2,\"aria_controls\":\"panelsStayOpen-collapseTwo\",\"arial_abelledby\":\"panelsStayOpen-headingTwo\",\"week_name\":\"Tuesday\",\"status\":true,\"available_timings\":[{\"id\":1,\"start_time\":\"09:00 AM\",\"end_time\":\"17:00 PM\"}]},{\"id\":3,\"aria_controls\":\"panelsStayOpen-collapseThree\",\"arial_abelledby\":\"panelsStayOpen-headingThree\",\"week_name\":\"Wednesday\",\"status\":true,\"available_timings\":[{\"id\":1,\"start_time\":\"09:00 AM\",\"end_time\":\"17:00 PM\"}]},{\"id\":4,\"aria_controls\":\"panelsStayOpen-collapseFour\",\"arial_abelledby\":\"panelsStayOpen-headingFour\",\"week_name\":\"Thursday\",\"status\":true,\"available_timings\":[{\"id\":1,\"start_time\":\"09:00 AM\",\"end_time\":\"17:00 PM\"}]},{\"id\":5,\"aria_controls\":\"panelsStayOpen-collapseFive\",\"arial_abelledby\":\"panelsStayOpen-headingFive\",\"week_name\":\"Friday\",\"status\":true,\"available_timings\":[{\"id\":1,\"start_time\":\"09:00 AM\",\"end_time\":\"17:00 PM\"}]},{\"id\":6,\"aria_controls\":\"panelsStayOpen-collapseSix\",\"arial_abelledby\":\"panelsStayOpen-headingSix\",\"week_name\":\"Saturday\",\"status\":true,\"available_timings\":[]},{\"id\":7,\"aria_controls\":\"panelsStayOpen-collapseSeven\",\"arial_abelledby\":\"panelsStayOpen-headingSeven\",\"week_name\":\"Sunday\",\"status\":false,\"available_timings\":[{\"id\":1,\"start_time\":\"09:00 AM\",\"end_time\":\"17:00 PM\"}]}]"
    },
    timezone:{
        type:String,
        required: false
    },
    
}, { versionKey: false })
availabilitySchema.set('timestamps', true);
module.exports = mongoose.model('Availability', availabilitySchema);
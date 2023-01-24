const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profilePicture:{
        type:String,
        required:false,
        default:"http://www.mountainheavensella.com/wp-content/uploads/2018/12/default-user.png"
    },
    username:{
        type:String,
        required: true
    },
    fullName:{
        type:String,
        required: true
    },
    emailAddress:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    about:{
        type:String,
        required: false,
        default: ""
    },
    timezone:{
        type:String,
        required: true
    },
    
}, { versionKey: false })

userSchema.set('timestamps', true);
module.exports = mongoose.model('Users', userSchema);
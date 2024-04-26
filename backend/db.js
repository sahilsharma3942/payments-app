const mongoose = require('mongoose');
const {Schema} = require("mongoose")

mongoose.connect("mongodb+srv://sahilsharma3942:oehps2183%40K@cluster0.idpwbqe.mongodb.net/paytm");

const userSchema = new Schema({
    username :{
        type: String,
        unique: true,
        lowercase : true,
        trim: true,
        minLength: 3,
        maxLength : 30
    },
    password :{
        type: String,
        minLength: 8,
        required: true,
    },
    firstname : {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    },
    lastname : {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
    }
});

const User = mongoose.model("User", userSchema);

const accountSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance : {
        type: Number,
        required: true
    }
})

const Account = mongoose.model("Account",accountSchema);

 module.exports = {
    User,
    Account
 }
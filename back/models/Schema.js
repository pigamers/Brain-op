// This is the file for Schema Creation in Mongodb

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        confirmPassword: String
    }
);

module.exports = mongoose.model("UserInfo", UserSchema);
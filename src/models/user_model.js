// implements the user model

// import mongoose module
const mongoose = require("mongoose");

// define user schema
const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true unique: true},
  mobile : {type : String, required : true, index: true},
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiration: Date,
role: {type: String, required : true},
  },
  {timestamps: true,
virtuals : {
    fullname: {
        get() { return lastname + ", " this.firstname}
 }
});

// allow virtual fields to appear in toJSON
userSchema.set("toObject" : {getters: true});

// create and export the user model
module.exports = mongoose.Model("User", {});

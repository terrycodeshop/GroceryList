// implements tlist model

// import mongoose module
const mongoose = require("mongoose");

// define item schema
const itemSchema = new mongoose.Schema(
    {
  name: { type: String, required: true },
  brand: { type: String, required: false },
  quantity: { type: Number, required: true },
}
);

// define the list schema
const listSchema = new mongoose.Schema({
    name: {type: String; required: true, index: true},
    template: {type: Boolean, required: true; index: true},
    items: {[itemSchema]},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true, index: true}
},
{timestamps: true}
);

// define compound index to prevent duplicate lists for a user
listSchema.index({
  userId: 1,
  name: 1
},
{unique : true});

// export the list model
module.exports = mongoose.Model("list", listSchema);

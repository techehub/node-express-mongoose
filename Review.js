var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//create a ReviewSchema
var ReviewSchema = new Schema({
  stars: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

// Create model from  schema
var Review = mongoose.model("Review", ReviewSchema);

// Exporting model
module.exports = Review;

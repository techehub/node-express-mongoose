var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a ProductSchema
var ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

// Create model from schema
var Product = mongoose.model("Product", ProductSchema);

// Exporting model
module.exports = Product;
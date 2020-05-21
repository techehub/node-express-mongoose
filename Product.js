var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a ProductSchema
var ProductSchema = new Schema({

 
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  price: {
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
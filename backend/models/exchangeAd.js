const mongoose = require("mongoose");

const exchangeAdSchema = new mongoose.Schema({
  book_title:
  { type: String, required: true},

  category: 
  { type: String, required: true },

  condition:
  {type: String, required: true},

  image:
  {type: String, required: true},

  description: 
  { type: String, required: true },

  terms_and_conditions: 
  { type: String, required: true },
  
});

const exchangeAd = mongoose.model("exchangeAd", exchangeAdSchema);

module.exports = exchangeAd;
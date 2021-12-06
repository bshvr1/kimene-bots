const mongoose = require("mongoose");

module.exports = mongoose.model("inception_kayıt", new mongoose.Schema({
   user: String,
   erkek: Number,
   kadın: Number,
   toplam: Number,
   kayıtlar: Array
}));
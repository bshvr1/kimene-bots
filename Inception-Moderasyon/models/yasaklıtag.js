const mongoose = require("mongoose");

module.exports = mongoose.model("inception_yasaklıtag", new mongoose.Schema({
  guild: String,
  taglar: Array
}));
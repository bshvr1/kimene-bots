const mongoose = require("mongoose");

module.exports = mongoose.model("inception_uyarılar", new mongoose.Schema({
   user: String,
   uyarılar: Array,
}));
const mongoose = require("mongoose");

module.exports = mongoose.model("inception_extraMute", new mongoose.Schema({
    user: String, 
    array: Array
}));
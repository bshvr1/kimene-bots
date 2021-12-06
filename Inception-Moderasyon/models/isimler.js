const mongoose = require("mongoose");

module.exports = mongoose.model("inception_isimler", new mongoose.Schema({
    user: String, 
    isimler: Array
}));
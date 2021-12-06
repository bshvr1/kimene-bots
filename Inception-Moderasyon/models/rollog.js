const mongoose = require("mongoose");

module.exports = mongoose.model("inception_rollog", new mongoose.Schema({
    user: String, 
    roller: Array
}));

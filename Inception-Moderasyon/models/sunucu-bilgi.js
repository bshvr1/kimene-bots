const mongoose = require("mongoose")

const inception_sunucu = new mongoose.Schema({
   guild: String,
   ihlal: Number
})

module.exports = mongoose.model("inception_sunucu", inception_sunucu)
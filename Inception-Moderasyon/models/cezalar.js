const mongoose = require("mongoose")

const inception_cezalar = new mongoose.Schema({
    user: String,
    ihlal: Number,
    yetkili: String,
    ceza: String,
    tarih: String,
    bitiş: String,
    sebep: String
})

module.exports = mongoose.model("inception_cezalar", inception_cezalar)
const mongoose = require("mongoose");


const streamSchema = mongoose.Schema({
    email : {type : String,required : true},
    key: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date : { type : Date , required : true}
})

module.exports = mongoose.model("streams",streamSchema)
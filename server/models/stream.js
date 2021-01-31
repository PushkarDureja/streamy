const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  Streams: [
    {
      key: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
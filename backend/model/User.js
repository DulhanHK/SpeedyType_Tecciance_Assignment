const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  history: [
    {
      snippet: String,
      timeTaken: Number,
      charsPerMinute: Number,
      date: String
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);

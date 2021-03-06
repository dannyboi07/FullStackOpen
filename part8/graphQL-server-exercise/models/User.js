const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5
    },
    favGenre: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema);

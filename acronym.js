var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/acronyms")
var db = mongoose.connection

var acronymSchema = mongoose.Schema({
    acronym: String,
    meaning: String,
    count: Number
});

module.exports = mongoose.model("acronyms", acronymSchema);

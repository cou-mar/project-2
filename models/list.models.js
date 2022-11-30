const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: {type: String},
    content: {type: [String]},
    user: {type: Schema.Types.ObjectId, ref: "User"}
});

const List = mongoose.model('List', listSchema);

module.exports = List;
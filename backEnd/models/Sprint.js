const mongoose = require('mongoose');

const SprintSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    startData: Date,
    endData: Date,
    projectId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Sprint', SprintSchema);

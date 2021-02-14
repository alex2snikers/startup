const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    startData: Date,
    endData: Date,
    epicId: mongoose.Schema.Types.ObjectId,
    sprintId: mongoose.Schema.Types.ObjectId,
    projectId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Task', TaskSchema);

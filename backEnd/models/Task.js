const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    startData: Date,
    endData: Date,
    position: Number,
    epicId: mongoose.Schema.Types.ObjectId,
    sprintId: mongoose.Schema.Types.ObjectId,
    projectId: mongoose.Schema.Types.ObjectId,
    after: mongoose.Schema.Types.ObjectId | null,
});

module.exports = mongoose.model('Task', TaskSchema);

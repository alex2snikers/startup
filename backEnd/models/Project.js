const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    managerId: mongoose.Schema.Types.ObjectId,
    companyId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Project', ProjectSchema);

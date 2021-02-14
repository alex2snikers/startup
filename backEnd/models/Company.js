const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    projectId: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Company', CompanySchema);

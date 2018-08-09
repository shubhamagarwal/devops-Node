const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: 'admin' });

module.exports = mongoose.model('admin', AdminSchema);
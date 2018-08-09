const mongoose = require('mongoose');

const ToolsSchema = new mongoose.Schema({
    id: Number,
    type: Number,
    typeDescription: String,
    categoryId:Number,
    categoryName:String,
    title:String,
    complete:Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('devops', ToolsSchema);



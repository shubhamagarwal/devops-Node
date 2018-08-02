module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Retrieve all Notes
    app.get('/notes', notes.findAll);
    app.get('/tools', notes.find);
}
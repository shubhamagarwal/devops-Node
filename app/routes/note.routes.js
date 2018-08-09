module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Retrieve all Notes
    app.get('/tools', notes.find);
    app.post('/create', notes.create);
    app.post('/login', notes.login);
}
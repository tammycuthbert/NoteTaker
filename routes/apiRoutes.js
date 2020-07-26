var db = "./db/db.json";

var fs = require("fs");

var notes = JSON.parse(fs.readFileSync(db, 'utf8'));

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });
    app.get("/api/notes/:id", function(req, res) {
        res.json(notes[(req.params.id)]);
    });
    app.post("/api/notes", function(req, res) {
        var note = req.body;
        note.id = (notes.length) + 1;
        notes.push(note);
        fs.writeFileSync(db, JSON.stringify(notes));
        res.json(notes)
    });
    app.delete("/api/notes/:id", function(req, res) {
        var Id = req.params.id;
        var newId = 1;
        console.log(`delete id:${Id}`);
        notes = notes.filter(currentNote => {
            return currentNote.id != Id;
        });
        for (currentNote of notes) {
            currentNote.id = newId;
            newId++;
        }
        fs.writeFileSync(db, JSON.stringify(notes));
        res.json(notes);
    });
};
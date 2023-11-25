const express = require("express")
const fs = require("fs")
const { uuid } = require("uuidv4")

const index = express()

//Get notes from db.json
index.get("/notes", (req, res) => {
    //pull from db.json
    fs.readFile('./db/db.json', function(err, data) {
      if (err) throw err;
      //return JSON object
      res.json(JSON.parse(data));
    });
  })

  //Add note to db.json
index.post("/notes", (req, res) => {
  //pull from db.json
  fs.readFile('./db/db.json', function(err, data) {
    if (err) throw err;
    // create new note object
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid(),
    };
    // add note to db.json
    let noteList = JSON.parse(data);
    noteList.push(newNote);
    //push updated db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(newNote);
  });
})

//Delete note from db.json
index.delete("/notes/:id", (req, res) => {
  //pull from db.json
  fs.readFile('./db/db.json', function(err, data) {
    let noteList = JSON.parse(data);
    const noteToDelete = noteList.filter((note) => {
      note.id === req.params.id;
    })
    // delete note with req.id from db.json (if exists)
    if (!noteToDelete) {
      res.json(console.log(`Error: note with id '${req.params.id}' does not exist. Could not delete note.`));
    }
    else {
      noteList = noteList.filter((note) => {
        return note.id !== req.params.id;
      })
      //push updated db.json
      fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
      res.json(console.log(`Note with id '${req.params.id}' deleted.`));
    }
  });
})

  module.exports = index
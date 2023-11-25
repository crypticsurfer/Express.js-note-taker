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


  module.exports = index
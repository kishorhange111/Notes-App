const chalk = require("chalk");
const fs = require("fs");

function addNotes(title, body) {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);
  if (!duplicateNote) {
    notes.push({ title: title, body: body });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note Saved"));
  } else {
    console.log(chalk.red.inverse("Note Already Present"));
  }
}

function removeNotes(title) {
  const notes = loadNotes();
  const notesPreviousLength = notes.length;
  for (let i = 0; i < notes.length; i++) {
    if (title === notes[i].title) {
      notes.splice(i, 1);
      break;
    }
  }
  if (notes.length === notesPreviousLength) {
    console.log(chalk.red.inverse("No Notes Found"));
  } else {
    console.log(chalk.green.inverse("Note Deleted"));
    saveNotes(notes);
  }
}

function listNotes() {
  const notes = loadNotes();
  console.log("Your Notes\n");
  if (notes.length === 0) {
    console.log(chalk.red.inverse("Empty "));
  } else {
    for (let i = 0; i < notes.length; i++) {
      console.log("Title : " + notes[i].title + "\nBody : " + notes[i].body);
    }
  }
  console.log(
    "----------------------------------------------------------------------------------------------------------------------"
  );
}

function readNotes(title) {
  const notes = loadNotes();
  const data = notes.find((note) => note.title === title);
  if (data !== undefined) {
    console.log(
      chalk.green.inverse("Title : " + data.title + "\nBody : " + data.body)
    );
  } else {
    console.log(chalk.red.inverse("No Note Found"));
  }
}

function saveNotes(notes) {
  const data = JSON.stringify(notes);
  fs.writeFileSync("notes.json", data);
}

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const notes = dataBuffer.toString();
    return JSON.parse(notes);
  } catch (error) {
    return [];
  }
}

module.exports = {
  removeNotes: removeNotes,
  addNotes: addNotes,
  listNotes: listNotes,
  readNotes: readNotes,
};

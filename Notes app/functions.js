let fs = require("fs");
let chalk = require("chalk");

// to add Notes
const addNotes = (title, body) => {
  let notes = loadNotes();

  let duplicate = notes.find((note) => {
    return note.title === title;
  });

  if (!duplicate) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.bgGreen("Notes Added SucessFully !"));
  } else {
    console.log(chalk.bgRed("Title is already taken !"));
  }
};

// Remove certain note
const removeNote = (title) => {
  let notes = loadNotes();
  let nwNote = notes.filter((note) => note.title !== title);
  saveNotes(nwNote);

  if (notes.length === nwNote.length) {
    console.log(chalk.bgRed("No Notes Found"));
  } else {
    console.log(chalk.bgGreen("Note Removed"));
  }
};

// List all notes

const listNotes = () => {
  console.log(chalk.bgBlue("Your Notes"));
  let notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.bgCyan(note.title));
  });
};

// read certain note

const readNote = (title) => {
  console.log(title);
  let notes = loadNotes();
  let response = notes.find((note) => note.title === title);

  if (response) {
    console.log(chalk.bgGrey(response.title));
    console.log(response.body);
  } else {
    console.log(chalk.bgRed("No Notes Found"));
  }
};

// save notes to fs
const saveNotes = (notes) => {
  let jsonNotes = JSON.stringify(notes);
  fs.writeFileSync("notes.json", jsonNotes);
};

// read and load notes from fs
const loadNotes = () => {
  try {
    let buffer = fs.readFileSync("notes.json");
    let data = JSON.parse(buffer.toString());
    return data;
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNotes,
  removeNote,
  listNotes,
  readNote,
};

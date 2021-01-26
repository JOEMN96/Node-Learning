// NPM IMPORTS
let chalk = require("chalk");
let yargs = require("yargs");
let validator = require("validator");
// FILE IMPORTS
let { addNotes, removeNote, listNotes, readNote } = require("./functions");

// ADD DIFFERENT YARGS COMMAND -- TO GET DATA FROM USER

// remove

yargs.command({
  command: "remove",
  describe: "to remove a certain note",
  builder: {
    title: {
      describe: "title of the note u want to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler(arg) {
    removeNote(arg.title);
  },
});

// add

yargs.command({
  command: "add",
  describe: "add new notes",
  builder: {
    title: {
      describe: "Enter notes title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "enter the note",
      type: "string",
      demandOption: true,
    },
  },
  handler(args) {
    addNotes(args.title, args.body);
  },
});

// List

yargs.command({
  command: "list",
  describe: "list the notes",
  handler() {
    listNotes();
  },
});

// Read

yargs.command({
  command: "read",
  describe: "reading the notes",
  builder: {
    title: {
      descrbe: "Note Title To read",
      demandOption: true,
      type: "string",
    },
  },
  handler(args) {
    readNote(args.title);
  },
});

yargs.parse();

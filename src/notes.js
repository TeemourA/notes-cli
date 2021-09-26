import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import chalk from 'chalk';

const NOTES_SEPARATOR = chalk.bold.blue('\n--------------\n');

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getNotesStorePath = (filename) =>
  path.join(__dirname, '/store', `${filename}.json`);

const storePath = getNotesStorePath('notes');

const saveNotes = (data) => {
  const dataToWrite = JSON.stringify(data);
  fs.writeFileSync(storePath, dataToWrite);
};

export const loadNotes = () => {
  const data = fs.readFileSync(storePath).toString();

  if (!data) return [];

  return JSON.parse(data);
};

export const addNote = (title, body) => {
  const notes = loadNotes();
  const hasDuplicates = notes.some(
    ({ title: noteTitle }) => noteTitle === title
  );

  if (hasDuplicates)
    return console.warn(
      chalk.bgRed.black(
        'Note with the provided title is already exists, please choose a new one.'
      )
    );

  notes.push({ title, body });
  saveNotes(notes);
  console.log(chalk.bgGreen.black('New note added!'));
};

export const removeNote = (title) => {
  const notes = loadNotes();
  const notesWithoutRemovedNote = notes.filter(
    ({ title: noteTitle }) => noteTitle !== title
  );

  const noteRemoved = notes.length > notesWithoutRemovedNote.length;

  if (!noteRemoved)
    return console.warn(
      chalk.bgRed.black(`Note with title '${title}' doesn't exist`)
    );

  saveNotes(notesWithoutRemovedNote);
  console.log(chalk.bgGreen.black('Note successfully removed!'));
};

export const getNotesList = () => {
  const notes = loadNotes();
  const formattedNotesList = notes
    .map(({ title }) => chalk.bold.yellowBright(title))
    .join(NOTES_SEPARATOR);

  return console.log(
    `${chalk.bold.green('Your Notes:')}\n\n${formattedNotesList}`
  );
};

export const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find(({ title: noteTitle }) => noteTitle === title);

  if (!noteToRead)
    return console.warn(
      chalk.bgRed.black(`Note with title '${title}' doesn't exist`)
    );

  return console.log(
    `${chalk.bold.yellow('Title')}: ${chalk.blue(
      noteToRead.title
    )}\n${chalk.bold.yellow('Body')}: ${chalk.blue(noteToRead.body)}`
  );
};

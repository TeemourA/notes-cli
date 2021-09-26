import chalk from 'chalk';
import y from 'yargs';
import { hideBin } from 'yargs/helpers';

import {
  addNote,
  removeNote,
  getNotesList,
  readNote,
} from './src/notes.js';

const yargs = y(hideBin(process.argv));

yargs
  .command({
    command: 'add',
    describe: 'Add a new Note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string',
      },
    },
    handler({ title, body }) {
      addNote(title, body);
    },
  })
  .command({
    command: 'remove',
    describe: 'Remove a new Note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
    },
    handler({ title }) {
      removeNote(title);
    },
  })
  .command({
    command: 'list',
    describe: 'Lists all Notes',
    handler() {
      getNotesList();
    },
  })
  .command({
    command: 'read',
    describe: 'Read a Note',
    builder: {
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
    },
    handler({ title }) {
      readNote(title);
    },
  });

yargs.parse();

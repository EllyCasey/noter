import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'

import { NotebookSchema } from '../models/Notebook.js';
import { EntrySchema } from '../models/Entry.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Notebooks = mongoose.model('Notebook', NotebookSchema);

  Entries = mongoose.model('Entry', EntrySchema)
}

export const dbContext = new DbContext()

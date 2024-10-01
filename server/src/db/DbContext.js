import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'

import { NotebookSchema } from '../models/Notebook.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Notebooks = mongoose.model('Notebook', NotebookSchema)
}

export const dbContext = new DbContext()

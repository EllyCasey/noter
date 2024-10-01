import { dbContext } from "../db/DbContext.js"


class NotebooksService {
    async createNotebook(notebookData) {
        const notebook = await dbContext.Notebooks.create(notebookData)
        return notebook
    }

}

export const notebooksService = new NotebooksService()
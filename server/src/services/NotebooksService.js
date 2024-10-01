import { dbContext } from "../db/DbContext.js"


class NotebooksService {
    async createNotebook(notebookData) {
        const notebook = await dbContext.Notebooks.create(notebookData)
        await notebook.populate('creator')
        return notebook
    }

    async getUserNotebooks(userId) {
        const userNotebooks = await dbContext.Notebooks.find({ creatorId: userId }).populate('creator')
        return userNotebooks
    }

    async getNotebookById(notebookId) {
        const notebook = await dbContext.Notebooks.findById(notebookId).populate('creator entryCount', '-email')
        return notebook
    }
}

export const notebooksService = new NotebooksService()
import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class NotebooksService {
    async createNotebook(notebookData) {
        const notebook = await dbContext.Notebooks.create(notebookData)
        await notebook.populate('creator')
        return notebook
    }

    async getUserNotebooks(userId) {
        const userNotebooks = await dbContext.Notebooks.find({ creatorId: userId }).sort('-createdAt').populate('creator')
        return userNotebooks
    }

    async getNotebookById(notebookId) {
        const notebook = await dbContext.Notebooks.findById(notebookId).populate('creator entryCount', '-email')
        if (notebook == null) throw new Error('that notebook does not exist')
        return notebook
    }
    async deleteNotebook(notebookId, userId) {
        const notebookToDelete = await this.getNotebookById(notebookId)
        if (userId != notebookToDelete.creatorId) throw new Forbidden('you may not delete this.')

        await notebookToDelete.deleteOne()
        return 'Notebook has been deleted'
    }
}

export const notebooksService = new NotebooksService()
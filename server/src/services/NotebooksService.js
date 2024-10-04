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

    async editNotebook(notebookData, userId) {
        const notebookToEdit = await dbContext.Notebooks.findById(notebookData.id)
        if (notebookToEdit.creatorId != userId) throw new Forbidden('you are not the creator, you may not edit this.')
        notebookToEdit.creatorId = notebookToEdit.creatorId
        notebookToEdit.title = notebookData.title || notebookToEdit.title
        notebookToEdit.icon = notebookData.icon || notebookToEdit.icon
        notebookToEdit.color = notebookData.color || notebookToEdit.color
        notebookToEdit.coverImg = notebookData.coverImg || notebookToEdit.coverImg
        await notebookToEdit.save()
        return `${notebookToEdit.title} has been changed`
    }

    async deleteNotebook(notebookId, userId) {
        const notebookToDelete = await this.getNotebookById(notebookId)
        if (userId != notebookToDelete.creatorId) throw new Forbidden('you may not delete this.')

        await notebookToDelete.deleteOne()
        return 'Notebook has been deleted'
    }
}

export const notebooksService = new NotebooksService()
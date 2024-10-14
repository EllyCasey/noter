import { dbContext } from "../db/DbContext.js";
import { Forbidden } from "../utils/Errors.js";
import { notebooksService } from "./NotebooksService.js";


class EntriesService {

    async createEntry(entryData, userId) {
        if (entryData.notebookId != null) {
            const canCreateEntry = await notebooksService.getNotebookById(entryData.notebookId);
            if (canCreateEntry.creatorId != userId) throw new Forbidden('You did not create this notebook and may not create an entry for it.')
        }
        const entry = await dbContext.Entries.create(entryData)
        await entry.populate('notebook')
        return entry
    }
    async getUserEntries(userId) {
        const userEntries = await dbContext.Entries.find({ creatorId: userId }).sort('-createdAt').populate('notebook')
        return userEntries
    }

    async getEntriesInNotebook(notebookId) {
        const entries = await dbContext.Entries.find({ notebookId: notebookId }).sort('-createdAt').populate('notebook')
        return entries
    }
    async editEntry(entryData, userId) {
        const entryToEdit = await dbContext.Entries.findById(entryData.id)
        if (entryToEdit.creatorId != userId) throw new Forbidden('you did not create this, you may not change it.')
        entryToEdit.creatorId = entryToEdit.creatorId
        entryToEdit.description = entryData.description || entryToEdit.description
        entryToEdit.img = entryData.img ?? entryToEdit.img
        entryToEdit.notebookId = entryData.notebookId ?? entryToEdit.notebookId
        if (entryData.notebookId != null) {
            const newLocation = await notebooksService.getNotebookById(entryData.notebookId)
            if (newLocation.creatorId != userId) throw new Forbidden('This is not your notebook')
        }
        await entryToEdit.save()
        return `your entry has been updated`
    }
    async deleteEntry(entryId, userId) {
        const entryToDelete = await dbContext.Entries.findById(entryId)
        if (!entryToDelete) throw new Error('Could not delete, no entry with that ID')
        if (userId != entryToDelete.creatorId) throw new Forbidden('You did not create this entry, so you may not delete it.')
        await entryToDelete.deleteOne()
        return 'This entry has been deleted'

    }
}


export const entriesService = new EntriesService()
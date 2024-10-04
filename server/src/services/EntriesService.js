import { dbContext } from "../db/DbContext.js";


class EntriesService {

    async createEntry(entryData) {
        const entry = await dbContext.Entries.create(entryData)
        await entry.populate('notebook')
        return entry
    }
    async getUserEntries(userId) {
        const userEntries = await dbContext.Entries.find({ creatorId: userId }).populate('notebook')
        return userEntries
    }

    async getEntriesInNotebook(notebookId) {
        const entries = await dbContext.Entries.find({ notebookId: notebookId }).populate('notebook')
        return entries
    }
}

export const entriesService = new EntriesService()
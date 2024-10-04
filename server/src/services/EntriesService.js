import { dbContext } from "../db/DbContext.js";


class EntriesService {
    async createEntry(entryData) {
        const entry = await dbContext.Entries.create(entryData)
        await entry.populate('notebook')
        return entry
    }
}

export const entriesService = new EntriesService()
import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Entry } from "@/models/Entry.js"
import { AppState } from "@/AppState.js"


class EntriesService {
  async createEntry(entryData) {
      const response = await api.post('api/entries', entryData)
      logger.log('new entry was created', response.data)
      const createdEntry = new Entry(response.data)
      AppState.entries.unshift(createdEntry)
      return createdEntry
  }
  async getEntriesById(notebookId) {
      const response = await api.get(`api/notebooks/${notebookId}/entries`)
      logger.log('entries received by id', response.data)
      const notebookEntries = response.data.map(entryData => new Entry(entryData))
      AppState.entries = notebookEntries
  }
  async getUserEntries() {
    const response = await api.get('api/entries')
    logger.log('got user entries', response.data)
    const newEntries = response.data.map(entryData => new Entry(entryData))
    AppState.entries = newEntries
  }

}

export const entriesService = new EntriesService()
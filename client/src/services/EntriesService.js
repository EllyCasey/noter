import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Entry } from "@/models/Entry.js"
import { AppState } from "@/AppState.js"


class EntriesService {
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
  async createEntry(entryData) {
    const response = await api.post('api/entries', entryData)
    logger.log('new entry was created', response.data)
    const createdEntry = new Entry(response.data)
    const activeNotebook = AppState.activeNotebook
    if (activeNotebook?.id == createdEntry.notebookId)
      AppState.entries.unshift(createdEntry)
      return createdEntry
  }
  async updateEntry(entryData) {
      const response = await api.put(`api/entries/${entryData.id}`, entryData)
      logger.log('updated the entry', response.data)
      const newEntry = new Entry(response.data)
      const entryIndex = AppState.entries.findIndex(entry => entryData.id == entry.id)
      // AppState.entries.splice(entryIndex, 1, newEntry)
  }

  async deleteEntry(id) {
    const response = await api.delete(`api/entries/${id}`)
    logger.log('entry was deleted', response.data)
    const entryIndex = AppState.entries.findIndex(entryData => entryData.id ==id)
    AppState.entries.splice(entryIndex, 1)
}
  
}

export const entriesService = new EntriesService()
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

}

export const entriesService = new EntriesService()
import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Notebook } from "@/models/Notebook.js"
import { AppState } from "@/AppState.js"


class NotebooksService {
  async getNotebookById(notebookId) {
      const response = await api.get(`api/notebooks/${notebookId}`)
      logger.log('notebook received by id', response.data)
      AppState.activeNotebook = new Notebook(response.data)
  }
  async createNotebook(notebookData) {
      const response = await api.post('api/notebooks', notebookData)
      logger.log('new notebook was created', response.data)
      const createdNotebook = new Notebook(response.data)
      AppState.notebooks.unshift(createdNotebook)
      return createdNotebook
  }
  async getUserNotebooks() {
    const response = await api.get('api/notebooks')
    logger.log('got users notebook entries', response.data)
    const newNotebooks = response.data.map(notebookData => new Notebook(notebookData))
    AppState.notebooks = newNotebooks
  }

    
}

export const notebooksService = new NotebooksService()
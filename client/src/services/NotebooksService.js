import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"


class NotebooksService {
  async getUserNotebooks() {
    const response = await api.get('api/notebooks')
    logger.log('got users notebook entries', response.data)
  }

    
}

export const notebooksService = new NotebooksService()
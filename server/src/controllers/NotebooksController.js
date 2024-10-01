import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notebooksService } from "../services/NotebooksService.js";


export class NotebooksController extends BaseController {
    constructor() {
        super('api/notebooks')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createNotebook)
    }

    async createNotebook(request, response, next) {
        try {
            const notebookData = request.body
            const userInfo = request.userInfo
            notebookData.creatorId = userInfo.id
            const notebook = await notebooksService.createNotebook(notebookData)
            response.send(notebook)
        } catch (error) {
            next(error)
        }
    }
}
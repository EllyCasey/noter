import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notebooksService } from "../services/NotebooksService.js";


export class NotebooksController extends BaseController {
    constructor() {
        super('api/notebooks')
        this.router
            .get('/:notebookId', this.getNotebookById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getUserNotebooks)
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

    async getUserNotebooks(request, response, next) {
        try {
            const userId = request.userInfo.id
            const userNotebooks = await notebooksService.getUserNotebooks(userId)
            response.send(userNotebooks)
        } catch (error) {
            next(error)
        }
    }

    async getNotebookById(request, response, next) {
        try {
            const notebookId = request.params.notebookId
            const notebook = await notebooksService.getNotebookById(notebookId)
            response.send(notebook)
        } catch (error) {
            next(error)
        }
    }


}
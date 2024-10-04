import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { notebooksService } from "../services/NotebooksService.js";
import { entriesService } from "../services/EntriesService.js";


export class NotebooksController extends BaseController {
    constructor() {
        super('api/notebooks')
        this.router
            .get('/:notebookId', this.getNotebookById)
            .get('/:notebookId/entries', this.getEntriesInNotebook)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .get('', this.getUserNotebooks)
            .post('', this.createNotebook)
            .put('/:notebookId', this.editNotebook)
            .delete('/:notebookId', this.deleteNotebook)
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

    async getEntriesInNotebook(request, response, next) {
        try {
            const notebookId = request.params.notebookId
            const entries = await entriesService.getEntriesInNotebook(notebookId)
            response.send(entries)
        } catch (error) {
            next(error)
        }
    }

    async editNotebook(request, response, next) {
        try {
            const userId = request.userInfo.id
            const notebookData = request.body
            notebookData.id = request.params.notebookId
            const notebook = await notebooksService.editNotebook(notebookData, userId)
            response.send(notebook)
        } catch (error) {
            next(error)
        }
    }

    async deleteNotebook(request, response, next) {
        try {
            const notebookId = request.params.notebookId
            const userId = request.userInfo.id
            const message = await notebooksService.deleteNotebook(notebookId, userId)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }


}
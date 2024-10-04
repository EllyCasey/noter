import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { entriesService } from "../services/EntriesService.js";

export class EntriesController extends BaseController {
    constructor() {
        super('api/entries')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEntry)
            .get('', this.getUserEntries)
    }

    async createEntry(request, response, next) {
        try {
            const entryData = request.body
            const userInfo = request.userInfo
            entryData.creatorId = userInfo.id
            const entry = await entriesService.createEntry(entryData)
            response.send(entry)
        } catch (error) {
            next(error)
        }
    }

    async getUserEntries(request, response, next) {
        try {
            const userId = request.userInfo.id
            const userEntries = await entriesService.getUserEntries(userId)
            response.send(userEntries)
        } catch (error) {
            next(error)
        }
    }

}
import { Account } from "./Account.js"


export class Notebook{

    constructor(data){
        this.id = data.id
        this.title = data.title
        this.icon = data.icon
        this.color = data.color
        this.coverImg = data.coverImg
        this.creatorId = data.creatorId
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.creator = data.creator ? new Account(data.creator) : null
        this.entryCount = data.entryCount
    }
}
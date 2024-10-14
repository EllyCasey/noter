
export class Entry{

    constructor(data){
        this.id = data.id
        this.description = data.description
        this.img = data.img
        this.notebookId = data.notebookId
        this.updatedAt = new Date(data.updatedAt)
        this.notebook = data.notebook
    }
}
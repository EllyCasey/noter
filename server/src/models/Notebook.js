import { Schema } from "mongoose";


export const NotebookSchema = new Schema({
    title: { type: String, minLength: 3, maxLength: 25, required: true },
    icon: { type: String, maxLength: 500, required: true },
    color: { type: String, length: 7, required: true },
    coverImg: { type: String, minlength: 1, maxLength: 500, required: true },
    creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

NotebookSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

NotebookSchema.virtual('entryCount', {
    localField: '_id',
    ref: 'Entry',
    foreignField: 'notebookId',
    count: true
})

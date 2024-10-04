import { Schema } from "mongoose";


export const EntrySchema = new Schema({
    description: { type: String, minLength: 0, maxLength: 2000, required: true },
    img: { type: String, minLength: 0, maxLength: 500, required: false },
    notebookId: { type: Schema.ObjectId, ref: 'Notebook', required: false },
    creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

EntrySchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

EntrySchema.virtual('notebook', {
    localField: 'notebookId',
    ref: 'Notebook',
    foreignField: '_id',
    justOne: true
})
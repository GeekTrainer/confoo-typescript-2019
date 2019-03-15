import { Document, Schema, model } from 'mongoose';

export interface Task {
    text: string;
}

interface TaskDocument extends Task, Document {}

const taskSchema = new Schema({
    text: {
        type: String,
        required: true
    }
})

export const TaskModel = model<TaskDocument>('task', taskSchema);
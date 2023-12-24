import { Model, Schema, Types, model } from "mongoose";
import { Type } from "typescript";

export interface IIssue {
    title: string,
    description: string,
    price: number,
    user: Types.ObjectId,
    createdAt: Date,
}

const IssuesSchema = new Schema<IIssue>({
    title: {
        type: String,
        required: [ true, "Es necesario el Título"]
    },
    description: {
        type: String,
        required: [true, "La descripción es necesaria"]
    },
    price: {
		type: Number,
		required: true,
	},
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const Issue: Model<IIssue> = model<IIssue>("Issue", IssuesSchema);

export default Issue
import { Request, Response } from "express";
import Issue, {IIssue} from "../models/issue";
import { ObjectId } from "mongoose";

export const postNewIssue = async (req: Request, res: Response)=>{
    const {title, description, price}: IIssue =req.body;

    const user: ObjectId =req.body.userConfirmed._id;

    const IssueData ={
        title,
        description,
        user: user,
        createdAt: new Date()
    }

    const issue = new Issue(IssueData)

    await issue.save()

    res.status(201).json({
        issue
    })
}
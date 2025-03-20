// schemas and models
import { Schema, Types, model } from "mongoose";
import mongoose from 'mongoose';

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
})

export const UserModel = model("User", UserSchema);

const contentTypes = ['image', 'video', 'text', 'article'];
const ContentSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true, default: ''},
    link: {type: String, required: true},
    type: {type: String, enum: contentTypes, required: true},
    tags: [{type: Types.ObjectId, ref: 'Tag'}],
    userId: [{type: Types.ObjectId, ref: 'User', required: true}],
    // add more fields like createdAt, updatedAt etc 
})

export const ContentModel = model("Content", ContentSchema);
// schemas and models
import { Schema, Types, model } from "mongoose";

const UserSchema = new Schema({
    username: { 
        type: String, 
        unique: true, 
        required: true
    },
    password: {
        type: String,
         required: true
    },
})

export const UserModel = model("User", UserSchema);

const contentTypes = ["youtube", "twitter", "document", "link"];

const ContentSchema = new Schema({
    cardInfo: {
        type: String
    },
    title: {
        type: String, 
    },
    description: {
        type: String, 
        default: ''
    },
    embeddedLink: {
        type: String, 
        required: true
    },
    contentType: {
        type: String, 
        enum: contentTypes, 
        required: true
    },
    tags: [{
        type: String,
        id: Types.ObjectId,
        ref: 'Tag'
    }],
    userId: {
        type: Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

ContentSchema.pre('save', function(next) {
    this.updatedAt = new Date(Date.now());
    next();
})
export const ContentModel = model("Content", ContentSchema);

const TagsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    //
})

export const TagsModel = model("Tag", TagsSchema);

const linkSchema = new Schema({
    uniqueHash: {
        type: String,
        unique: true,
        required: true
    }, 
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const LinkModel = model("Link", linkSchema);
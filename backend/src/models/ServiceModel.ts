//Import tools
import { Schema, model } from 'mongoose';

//Create Services Schema
const servicesSchema = new Schema(
    {
        creationDate: {
            type: String,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        img: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        description: {
            type: String,
            required: true,
        },
        urlVideo: {
            type: String,
        },
        rating: {
            type: Number,
            default: 0,
        },
        rewardsPointsWin: {
            type: Number,
            default: 0,
        },
    },
    {
        versionKey: false,
    }
);

export default model('Services', servicesSchema);

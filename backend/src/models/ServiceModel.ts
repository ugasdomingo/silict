//Import tools
import { Schema, model } from 'mongoose';

//Create Services Schema
const servicesSchema = new Schema(
    {
        creationDate: {
            type: String,
        },
        initalDate: {
            type: Date,
        },
        finalDate: {
            type: Date,
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
        price: {
            type: Number,
            required: true,
        },
        pid: {
            type: Schema.Types.ObjectId,
            ref: 'Provider',
            required: true,
        },
        rating: {
            stars: {
                type: Number,
            },
            reviews: {
                type: String,
            },
            uid: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        },
    },
    {
        versionKey: false,
    }
);

export default model('Services', servicesSchema);

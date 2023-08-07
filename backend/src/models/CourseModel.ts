//Import tools
import { Schema, model } from 'mongoose';

//Create Courese Schema
const courseSchema = new Schema(
    {
        creationDate: {
            type: String,
            required: true,
        },
        initalDate: {
            type: String,
            required: true,
        },
        finalDate: {
            type: String,
            default: 'Endless',
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
        url: {
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

//Export the model
export default model('Course', courseSchema);

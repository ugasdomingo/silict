//Import tools
import { Schema, model } from 'mongoose';

//Create Services Schema
const servicesSchema = new Schema(
    {
        creationDate: {
            type: Date,
            default: Date.now(),
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
        pid: {
            type: Schema.Types.ObjectId,
            ref: 'Provider',
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

export default model('Services', servicesSchema);

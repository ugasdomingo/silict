//Import tools
import { Schema, model } from 'mongoose';

//Create Provider Schema
const providerSchema = new Schema({
    providerName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    brief: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    providerServies: {
        type: [String],
        required: true,
    },
    logo: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
    },
});

export default model('Provider', providerSchema);

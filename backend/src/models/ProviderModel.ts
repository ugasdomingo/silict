//Import tools
import { Schema, model } from 'mongoose';

//Create Provider Schema
const providerSchema = new Schema({
    providerName: {
        type: String,
        required: true,
    },
    creationDate: {
        type: String,
        required: true,
    },
    brief: {
        type: String,
        required: true,
    },
    website: {
        type: String,
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

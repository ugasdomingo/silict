//Import tools
import { Schema, model } from 'mongoose';

//Create Saves Schema
const saveSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: String,
        required: true,
        trim: true,
    },
    proof_img: {
        public_id: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
    },
    payment_status: {
        type: String,
        default: 'Pending',
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export default model('Save', saveSchema);

//Import tools
import { Schema, model } from 'mongoose';

//Create Enrollment Schema
const enrollmentSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    proof_img: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
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
    sid: {
        type: Schema.Types.ObjectId,
        ref: 'Services',
        required: true,
    },
});

export default model('Enrollment', enrollmentSchema);

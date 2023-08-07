//Import tools
import { Schema, model } from 'mongoose';

//Create Affiliate Schema
const affiliateSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    affiliate_status: {
        type: String,
        required: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export default model('Affiliate', affiliateSchema);

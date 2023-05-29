import { Schema, model } from 'mongoose';
import { ISave } from '../interfaces/ISave';

const saveSchema = new Schema<ISave>({
    date: {
        type: Date,
        default: Date.now(),
    },
    amount: {
        type: Number,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const SaveModel = model<ISave>('Save', saveSchema);

export default SaveModel;

//Import tools
import { Schema, model, Document } from 'mongoose';

//Create Affiliation Schema
const affiliationSchema = new Schema(
    {
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        paymentRef: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

// Methods
affiliationSchema.methods.changeStatus = async function (
    status: string,
    paymentRef: string
) {
    const affiliation = this;

    try {
        // Add payment reference
        affiliation.paymentRef = paymentRef;

        // Change status
        affiliation.status = status;

        await affiliation.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error cambiando el estatus de la afiliación');
    }
};

// Export Interface
export interface IAffiliation extends Document {
    _id: string;
    uid: string;
    paymentRef: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    changeStatus: (status: string, paymentRef: string) => Promise<boolean>;
}

// Export Model
export const AffiliationModel = model<IAffiliation>(
    'Affiliation',
    affiliationSchema
);

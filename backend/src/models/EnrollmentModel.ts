//Import tools
import { Schema, model, Document } from 'mongoose';

//Create Enrollment Schema
const enrollmentSchema = new Schema({
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
    paymentRef: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: 'Pending',
    },
});

//Methods
enrollmentSchema.methods.changeStatus = async function (
    status: string,
    paymentRef: string
) {
    const enrollment = this;

    try {
        // Add payment reference
        enrollment.paymentRef = paymentRef;

        // Change status
        enrollment.status = status;

        await this.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error al cambiar el estado de la inscripción');
    }
};

// Export Interface IEnrollment
export interface IEnrollment extends Document {
    _id: string;
    uid: string;
    sid: string;
    paymentRef: string;
    status: string;
    changeStatus: (status: string, paymentRef: string) => Promise<boolean>;
}

// Export Model
export const EnrollmentModel = model<IEnrollment>(
    'Enrollment',
    enrollmentSchema
);

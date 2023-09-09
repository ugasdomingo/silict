//Import tools
import { Schema, model, Document } from 'mongoose';

//Create User History Schema
const userHistorySchema = new Schema(
    {
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        startedService: {
            type: [Schema.Types.ObjectId],
            ref: 'Service',
            default: [],
        },
        finishedService: {
            type: [Schema.Types.ObjectId],
            ref: 'Service',
            default: [],
        },
        enrollmentId: {
            type: [Schema.Types.ObjectId],
            ref: 'Enrollment',
            default: [],
        },
        savesGoals: {
            goal: {
                type: [String],
                default: [],
            },
            amount: {
                type: [Number],
                default: [],
            },
        },
        affiliation: {
            initialDate: {
                type: [Date],
                default: [],
            },
            affiliationId: {
                type: [Schema.Types.ObjectId],
                ref: 'Affiliation',
                default: [],
            },
        },
        endAffiliation: {
            type: Date,
        },
        saves: {
            saveId: {
                type: [Schema.Types.ObjectId],
                ref: 'Save',
                default: [],
            },
            amount: {
                type: [Number],
                default: [],
            },
        },
        rewardsPointsEarned: {
            type: Number,
            default: 0,
        },
        rewardsPointsUsed: {
            type: Number,
            default: 0,
        },
        rewardsTypes: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

//Methods
userHistorySchema.methods.addEnrollment = async function (
    enrollmentId: string,
    serviceId: string,
    rewardsPoint: number
) {
    const userHistory = this;

    try {
        // Add enrollment id to enrollmentId array
        userHistory.enrollmentId.push(enrollmentId);

        // Add service id to startedService array
        userHistory.startedService.push(serviceId);

        // Add rewards points to rewardsPointsEarned
        userHistory.rewardsPointsEarned += rewardsPoint;

        await this.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error al agregar la inscripción');
    }
};

userHistorySchema.methods.addFinishedService = async function (
    serviceId: string,
    rewardsPoint: number
) {
    const userHistory = this;

    try {
        // Delete service id from startedService array
        const index = userHistory.startedService.indexOf(serviceId);
        if (index > -1) {
            userHistory.startedService.splice(index, 1);
        }

        // Add service id to finishedService array
        userHistory.finishedService.push(serviceId);

        // Add rewards points to rewardsPointsEarned
        userHistory.rewardsPointsEarned += rewardsPoint;

        await this.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error modificar el servicio a finalizado');
    }
};

userHistorySchema.methods.addSaveGoal = async function (
    goal: string,
    amount: number
) {
    const userHistory = this;

    try {
        // Add goal to goal array
        userHistory.savesGoals.goal.push(goal);

        // Add amount to amount array
        userHistory.savesGoals.amount.push(amount);

        await this.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error al agregar la meta de ahorro');
    }
};

userHistorySchema.methods.addAffiliation = async function (
    affiliationId: string,
    affiliationType: string,
    initialDate: Date
) {
    const userHistory = this;

    try {
        // Add affiliation id to affiliationId array
        userHistory.affiliation.affiliationId.push(affiliationId);

        // Add initial date to initialDate array
        userHistory.affiliation.initialDate.push(initialDate);

        // Add end date to endAffiliation
        userHistory.endAffiliation = new Date(
            initialDate.getFullYear() + 1,
            initialDate.getMonth(),
            initialDate.getDate()
        );

        // Add points to rewardsPointsEarned
        affiliationType === 'individual'
            ? (userHistory.rewardsPointsEarned += 100)
            : affiliationType === 'dual'
            ? (userHistory.rewardsPointsEarned += 200)
            : (userHistory.rewardsPointsEarned += 300);

        await this.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error al agregar la afiliación');
    }
};

userHistorySchema.methods.cleanEndAffiliation = async function () {
    const userHistory = this;

    try {
        // Clean endAffiliation
        userHistory.endAffiliation = undefined;

        await this.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error al limpiar la fecha final de afiliación');
    }
};

userHistorySchema.methods.addSave = async function (
    saveId: string,
    amount: number
) {
    const userHistory = this;

    try {
        // Add save id to saveId array
        userHistory.saves.saveId.push(saveId);

        // Add amount to amount array
        userHistory.saves.amount.push(amount);

        // Add points to rewardsPointsEarned
        userHistory.rewardsPointsEarned += amount * 2;

        await this.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error al agregar el ahorro');
    }
};

userHistorySchema.methods.addRewardClaimed = async function (
    rewardType: string,
    rewardsPointsUsed: number
) {
    const userHistory = this;

    try {
        // Add reward type to rewardsTypes array
        userHistory.rewardsTypes.push(rewardType);

        // Add points to rewardsPointsUsed
        userHistory.rewardsPointsUsed += rewardsPointsUsed;

        await userHistory.save();

        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Error al agregar la recompensa');
    }
};

userHistorySchema.methods.getRewardsPoints = async function () {
    const userHistory = this;

    try {
        return userHistory.rewardsPointsEarned - userHistory.rewardsPointsUsed;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener los puntos de recompensa');
    }
};

// Export Interface IUserHistory
export interface IUserHistory extends Document {
    _id: string;
    uid: string;
    startedService: string[];
    finishedService: string[];
    enrollmentId: string[];
    savesGoals: {
        goal: string[];
        amount: number[];
    };
    affiliation: {
        initialDate: Date[];
        affiliationId: string[];
    };
    endAffiliation: Date;
    saves: {
        saveId: string[];
        amount: number[];
    };
    rewardsPointsEarned: number;
    rewardsPointsUsed: number;
    rewardsTypes: string[];
    createdAt: Date;
    updatedAt: Date;
    addEnrollment: (
        enrollmentId: string,
        serviceId: string,
        rewardsPoint: number
    ) => Promise<boolean>;
    addFinishedService: (
        serviceId: string,
        rewardsPoint: number
    ) => Promise<boolean>;
    addSaveGoal: (goal: string, amount: number) => Promise<boolean>;
    addAffiliation: (
        affiliationId: string,
        affiliationType: string,
        initialDate: Date
    ) => Promise<boolean>;
    cleanEndAffiliation: () => Promise<boolean>;
    addSave: (saveId: string, amount: number) => Promise<boolean>;
    addRewardClaimed: (
        rewardType: string,
        rewardsPointsUsed: number
    ) => Promise<boolean>;
    getRewardsPoints: () => Promise<number>;
}

// Export User History Model
export const UserHistoryModel = model<IUserHistory>(
    'UserHistory',
    userHistorySchema
);

//Import tools
import { Schema, model, Document } from 'mongoose';

//Create Services Schema
const servicesSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        affiliationType: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
        },
        cover: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        urlVideo: {
            type: String,
        },
        starRewardsPoints: {
            type: Number,
            required: true,
        },
        endRewardsPoints: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Export Interface IServices
export interface IServices extends Document {
    _id: string;
    title: string;
    description: string;
    affiliationType: string;
    provider: string;
    price: number;
    category: string;
    tags: string[];
    cover: {
        public_id: string;
        secure_url: string;
    };
    urlVideo: string;
    starRewardsPoints: number;
    endRewardsPoints: number;
    createdAt: Date;
    updatedAt: Date;
}

// Export Model
export const ServiceModel = model<IServices>('Services', servicesSchema);

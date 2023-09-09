//Import tools
import { Request, Response } from 'express';
import { ServiceModel, IServices } from '../models/ServiceModel';
import { uploadServiceCover, deleteImage } from '../utils/cloudinary';
import fs from 'fs-extra';

// getAllService --> Line 10
// createService --> Line 20
// getService --> Line 34
// deleteService --> Line 47
// updateService --> Line 60

// getAllService Controller
export const getAllService = async (req: Request, res: Response) => {
    try {
        const services: IServices[] | null = await ServiceModel.find().lean();

        res.status(200).json(services);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllServiceByCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category;

        const services: IServices[] | null = await ServiceModel.find({
            category,
        }).lean();

        res.status(200).json(services);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// createService Controller
export const createService = async (req: any, res: Response) => {
    try {
        const {
            title,
            description,
            affiliationType,
            provider,
            price,
            category,
            tags,
            urlVideo,
            starRewardsPoints,
            endRewardsPoints,
        } = req.body;

        const service: IServices = new ServiceModel({
            title,
            description,
            affiliationType,
            provider,
            price,
            category,
            tags,
            urlVideo,
            starRewardsPoints,
            endRewardsPoints,
        });

        // Upload image to cloudinary
        if (req.files) {
            const result = await uploadServiceCover(
                req.files?.img?.tempFilePath as string
            );
            service.cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            // Delete image from temp folder
            await fs.unlink(req.files?.img?.tempFilePath, (err) => {
                if (err) throw err;
            });
        }

        await service.save();

        res.status(201).json(service);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// getServiceById Controller
export const getServiceById = async (req: Request, res: Response) => {
    try {
        const service: IServices | null = await ServiceModel.findById(
            req.params.id
        );

        if (!service)
            return res.status(404).json({ message: 'Service no encontrado' });

        res.status(200).json(service);
    } catch (error: any) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// deleteService Controller
export const deleteService = async (req: Request, res: Response) => {
    try {
        const service: IServices | null = await ServiceModel.findByIdAndDelete(
            req.params.id
        );

        if (!service)
            return res.status(404).json({ message: 'Service no encontrado' });

        await deleteImage(service.cover?.secure_url);

        res.status(204).json(service);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// updateService Controller
export const updateService = async (req: Request, res: Response) => {
    try {
        const updatedService: IServices | null =
            await ServiceModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });

        if (!updatedService)
            return res.status(404).json({ message: 'Service no encontrado' });

        res.status(200).json(updatedService);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

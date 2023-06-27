//Import tools
import ServiceModel from '../models/ServiceModel';
import { uploadServiceCover, deleteImage } from '../utils/cloudinary';
import fs from 'fs-extra';

// getAllService --> Line 10
// createService --> Line 20
// getService --> Line 34
// deleteService --> Line 47
// updateService --> Line 60

// getAllService Controller
export const getAllService = async (req: any, res: any) => {
    try {
        const services = await ServiceModel.find().lean();

        res.status(200).json(services);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// createService Controller
export const createService = async (req: any, res: any) => {
    try {
        const {
            initalDate,
            finalDate,
            title,
            category,
            tags,
            description,
            urlVideo,
            pid,
        } = req.body;

        const creationDate = new Date(Date.now()).toLocaleDateString(
            undefined,
            {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }
        );

        const service = new ServiceModel({
            creationDate,
            initalDate,
            finalDate,
            title,
            category,
            tags,
            description,
            urlVideo,
            pid,
        });

        if (req.files?.img) {
            const result = await uploadServiceCover(req.files.img.tempFilePath);
            service.img = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            await fs.unlink(req.files.img.tempFilePath);
        }
        await service.save();

        res.status(201).json(service);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// getServiceById Controller
export const getServiceById = async (req: any, res: any) => {
    try {
        const service = await ServiceModel.findById(req.params.id);

        if (!service)
            return res.status(404).json({ message: 'Service no encontrado' });
        res.status(200).json(service);
    } catch (error: any) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// deleteService Controller
export const deleteService = async (req: any, res: any) => {
    try {
        const service = await ServiceModel.findByIdAndDelete(req.params.id);

        if (!service)
            return res.status(404).json({ message: 'Service no encontrado' });

        await deleteImage(service.img?.secure_url);
        res.status(204).json(service);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// updateService Controller
export const updateService = async (req: any, res: any) => {
    try {
        const updatedService = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedService)
            return res.status(404).json({ message: 'Service no encontrado' });
        res.status(200).json(updatedService);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

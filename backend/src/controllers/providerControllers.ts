//Import tools
import ProviderModel from '../models/ProviderModel';
import { uploadProviderLogo, deleteImage } from '../utils/cloudinary';
import fs from 'fs-extra';

// getAllProvider --> Line 10
// createProvider --> Line 20
// getProvider --> Line 34
// deleteProvider --> Line 47
// updateProvider --> Line 60

// getAllProvider Controller
export const getAllProvider = async (req: any, res: any) => {
    try {
        const providers = await ProviderModel.find().lean();

        res.status(200).json(providers);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// createProvider Controller
export const createProvider = async (req: any, res: any) => {
    try {
        const { providerName, creationDate, brief, website } = req.body;

        const provider = new ProviderModel({
            providerName,
            creationDate,
            brief,
            website,
        });

        if (req.files?.logo) {
            const result = await uploadProviderLogo(
                req.files.logo.tempFilePath
            );
            provider.logo = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            await fs.unlink(req.files.logo.tempFilePath);
        }
        await provider.save();

        res.status(201).json(provider);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// getProviderById Controller
export const getProviderById = async (req: any, res: any) => {
    try {
        const provider = await ProviderModel.findById(req.params.id);

        if (!provider)
            return res.status(404).json({ message: 'Provider no encontrado' });
        res.status(200).json(provider);
    } catch (error: any) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// deleteProvider Controller
export const deleteProvider = async (req: any, res: any) => {
    try {
        const provider = await ProviderModel.findByIdAndDelete(req.params.id);

        if (!provider)
            return res.status(404).json({ message: 'Provider no encontrado' });

        await deleteImage(provider.logo?.secure_url);
        res.status(204).json(provider);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// updateProvider Controller
export const updateProvider = async (req: any, res: any) => {
    try {
        const updatedProvider = await ProviderModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProvider)
            return res.status(404).json({ message: 'Provider no encontrado' });
        res.status(200).json(updatedProvider);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

//Import tools
import SaveModel from '../models/SaveModel';
import { uploadSaveProof, deleteImage } from '../utils/cloudinary';
import fs from 'fs-extra';

// getAllSave --> Line 10
// createSave --> Line 20
// getSave --> Line 34
// deleteSave --> Line 47
// updateSave --> Line 60

// getAllSave Controller
export const getAllSave = async (req: any, res: any) => {
    try {
        const saves = await SaveModel.find().lean();

        res.status(200).json(saves);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// createSave Controller
export const createSave = async (req: any, res: any) => {
    try {
        const { amount } = req.body;

        const date = new Date(Date.now()).toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        const save = new SaveModel({ amount, date, uid: req.uid });

        if (req.files?.img) {
            const result = await uploadSaveProof(req.files.img.tempFilePath);
            save.proof_img = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            await fs.unlink(req.files.img.tempFilePath);
        }
        await save.save();

        res.status(201).json(save);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// getSaveById Controller
export const getSaveById = async (req: any, res: any) => {
    try {
        const save = await SaveModel.findById(req.params.id);

        if (!save)
            return res.status(404).json({ message: 'Save no encontrado' });
        res.status(200).json(save);
    } catch (error: any) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// deleteSave Controller
export const deleteSave = async (req: any, res: any) => {
    try {
        const save = await SaveModel.findByIdAndDelete(req.params.id);

        if (!save)
            return res.status(404).json({ message: 'Save no encontrado' });

        await deleteImage(save.proof_img?.secure_url);
        res.status(204).json(save);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// updateSave Controller
export const updateSave = async (req: any, res: any) => {
    try {
        const updatedSave = await SaveModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedSave)
            return res.status(404).json({ message: 'Save no encontrado' });
        res.status(200).json(updatedSave);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

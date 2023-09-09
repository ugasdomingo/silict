//Import tools
import { Request, Response } from 'express';
import { IRequest } from '../helpers/IRequest';
import { SaveModel, ISave } from '../models/SaveModel';
import { UserHistoryModel, IUserHistory } from '../models/UserHistoryModel';

// getAllSave --> Line 10
// createSave --> Line 20
// getSave --> Line 34
// deleteSave --> Line 47
// updateSave --> Line 60

// getAllSave Controller
export const getAllSave = async (req: Request, res: Response) => {
    try {
        const saves: ISave[] | null = await SaveModel.find().lean();

        res.status(200).json(saves);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// createSave Controller
export const createSave = async (req: IRequest, res: Response) => {
    try {
        const { amount } = req.body;

        // Create save
        const save: ISave = new SaveModel({ amount, uid: req.uid });
        await save.save();

        // Add save to user history
        const userHistory: IUserHistory | null = await UserHistoryModel.findOne(
            {
                uid: req.uid,
            }
        );
        await userHistory?.addSave(save._id, amount);

        res.status(201).json(save);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// getSaveById Controller
export const getSaveById = async (req: Request, res: Response) => {
    try {
        const save: ISave | null = await SaveModel.findById(req.params.id);

        if (!save)
            return res.status(404).json({ message: 'Save no encontrado' });

        res.status(200).json(save);
    } catch (error: any) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// updateSave Controller
export const updateSave = async (req: Request, res: Response) => {
    try {
        const { paymentRef, status } = req.body;

        const Save: ISave | null = await SaveModel.findById(req.params.id);

        if (!Save)
            return res.status(404).json({ message: 'Save no encontrado' });

        await Save.changeStatus(status, paymentRef);

        res.status(200).json(Save);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

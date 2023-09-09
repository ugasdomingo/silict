//Import tools
import { Request, Response } from 'express';
import { IRequest } from '../helpers/IRequest';
import { UserHistoryModel, IUserHistory } from '../models/UserHistoryModel';

// getAllUserHistory --> Line 10
// getUserHistory --> Line 22
// createSaveGoals --> Line 38

// getAllUserHistory Controller
export const getAllUserHistory = async (req: Request, res: Response) => {
    try {
        const userHistory: IUserHistory[] | null =
            await UserHistoryModel.find().lean();

        res.status(200).json(userHistory);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// getUserHistory Controller
export const getUserHistory = async (req: IRequest, res: Response) => {
    try {
        const userHistory: IUserHistory | null = await UserHistoryModel.findOne(
            { uid: req.uid }
        );

        if (!userHistory)
            return res.status(404).json({ message: 'Historial no encontrado' });

        res.status(200).json(userHistory);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// createSaveGoals Controller
export const createSaveGoals = async (req: IRequest, res: Response) => {
    const { goal, amount } = req.body;

    try {
        const userHistory: IUserHistory | null = await UserHistoryModel.findOne(
            { uid: req.uid }
        );

        if (!userHistory)
            return res.status(404).json({ message: 'Historial no encontrado' });

        userHistory.savesGoals.goal.push(goal);
        userHistory.savesGoals.amount.push(amount);

        await userHistory.save();

        return res.status(200).json(userHistory);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ message: 'Error al agregar el ahorro' });
    }
};

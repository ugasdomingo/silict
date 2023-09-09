//Import tools
import { Request, Response } from 'express';
import { IRequest } from '../helpers/IRequest';
import { AffiliationModel, IAffiliation } from '../models/AffiliationModel';
import { UserHistoryModel, IUserHistory } from '../models/UserHistoryModel';

// getAllAffiliation --> Line 10
// createAffiliation --> Line 20
// getAffiliation --> Line 34
// updateAffiliation --> Line 60

// getAllAffiliation Controller
export const getAllAffiliation = async (req: Request, res: Response) => {
    try {
        const affiliations: IAffiliation[] | null =
            await AffiliationModel.find().lean();

        res.status(200).json(affiliations);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// createAffiliation Controller
export const createAffiliation = async (req: IRequest, res: Response) => {
    try {
        const { affiliationType } = req.body;

        // Create affiliation
        const affiliation: IAffiliation = new AffiliationModel({
            uid: req.uid,
        });

        // Add affiliation to user history
        const userHistory: IUserHistory | null = await UserHistoryModel.findOne(
            { uid: req.uid }
        );

        if (!userHistory)
            return res.status(404).json({ message: 'Historial no encontrado' });

        const date = new Date(Date.now());

        await userHistory?.addAffiliation(
            affiliation._id,
            affiliationType,
            date
        );

        await affiliation.save();

        res.status(201).json(affiliation);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// getAffiliation Controller
export const getAffiliationById = async (req: IRequest, res: Response) => {
    try {
        const { affiliationId } = req.params;

        const affiliation: IAffiliation | null =
            await AffiliationModel.findById(affiliationId);

        if (!affiliation)
            return res
                .status(404)
                .json({ message: 'Afiliación no encontrada' });

        res.status(200).json(affiliation);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// updateAffiliation Controller
export const updateAffiliation = async (req: IRequest, res: Response) => {
    try {
        const { affiliationId } = req.params;
        const { status, paymentRef } = req.body;

        const affiliation: IAffiliation | null =
            await AffiliationModel.findById(affiliationId);

        if (!affiliation)
            return res
                .status(404)
                .json({ message: 'Afiliación no encontrada' });

        await affiliation?.changeStatus(status, paymentRef);

        res.status(200).json(affiliation);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

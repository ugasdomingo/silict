//Import tools
import AffiliateModel from '../models/AffiliateModel';
import { UserModel } from '../models/UserModel';

export const statusAffiliate = async (req: any, res: any) => {
    try {
        const updatedAffiliate = await UserModel.findByIdAndUpdate(
            req.uid,
            req.body,
            { new: true }
        );

        if (!updatedAffiliate)
            return res.status(404).json({ message: 'Afiliado no encontrado' });
        res.status(200).json(updatedAffiliate);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

export const createAffiliateHistory = async (req: any, res: any) => {
    try {
        const { status } = req.body;

        const date = new Date(Date.now()).toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        const affiliate = new AffiliateModel({ status, date, uid: req.uid });

        await affiliate.save();

        res.status(201).json(affiliate);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

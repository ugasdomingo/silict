//Import tools
import { UserHistoryModel, IUserHistory } from '../models/UserHistoryModel';

export const getRewardsPoints = async (uid: string) => {
    try {
        const userHistory: IUserHistory | null = await UserHistoryModel.findOne(
            { uid: uid }
        );

        if (!userHistory) throw new Error('Historial no encontrado');

        return userHistory.getRewardsPoints();
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
};

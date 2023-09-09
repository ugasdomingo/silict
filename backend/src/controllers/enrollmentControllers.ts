//Import tools
import { Request, Response } from 'express';
import { IRequest } from '../helpers/IRequest';
import { EnrollmentModel, IEnrollment } from '../models/EnrollmentModel';
import { ServiceModel, IServices } from '../models/ServiceModel';
import { UserHistoryModel, IUserHistory } from '../models/UserHistoryModel';

// getAllEnrollment --> Line 10
// createEnrollment --> Line 20
// getEnrollment --> Line 34
// deleteEnrollment --> Line 47
// updateEnrollment --> Line 60

// getAllEnrollment Controller
export const getAllEnrollment = async (req: Request, res: Response) => {
    try {
        const enrollments: IEnrollment[] | null =
            await EnrollmentModel.find().lean();

        res.status(200).json(enrollments);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// createEnrollment Controller
export const createEnrollment = async (req: IRequest, res: Response) => {
    try {
        const { serviceId } = req.body;

        // Create enrollment
        const enrollment: IEnrollment = new EnrollmentModel({
            serviceId,
            uid: req.uid,
        });

        // Get rewards points of service
        const services: IServices | null = await ServiceModel.findById(
            serviceId
        );

        if (!services)
            return res.status(404).json({ message: 'Servicio no encontrado' });

        const rewardsPoints = services.starRewardsPoints;

        // Add enrollment to user history
        const userHistory: IUserHistory | null = await UserHistoryModel.findOne(
            { uid: req.uid }
        );

        await userHistory?.addEnrollment(
            enrollment._id,
            serviceId,
            rewardsPoints
        );

        await enrollment.save();

        res.status(201).json(enrollment);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// getEnrollmentById Controller
export const getEnrollmentById = async (req: Request, res: Response) => {
    try {
        const enrollment: IEnrollment | null = await EnrollmentModel.findById(
            req.params.id
        );

        if (!enrollment)
            return res
                .status(404)
                .json({ message: 'Enrollment no encontrado' });

        res.status(200).json(enrollment);
    } catch (error: any) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// updateEnrollment Controller
export const updateEnrollment = async (req: Request, res: Response) => {
    try {
        const { paymentRef, status } = req.body;

        const Enrollment: IEnrollment | null = await EnrollmentModel.findById(
            req.params.id
        );

        if (!Enrollment)
            return res
                .status(404)
                .json({ message: 'Enrollment no encontrado' });

        await Enrollment.changeStatus(status, paymentRef);

        res.status(200).json(Enrollment);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

//Import tools
import EnrollmentModel from '../models/EnrollmentModel';
import { uploadEnrollmentProof, deleteImage } from '../utils/cloudinary';
import fs from 'fs-extra';

// getAllEnrollment --> Line 10
// createEnrollment --> Line 20
// getEnrollment --> Line 34
// deleteEnrollment --> Line 47
// updateEnrollment --> Line 60

// getAllEnrollment Controller
export const getAllEnrollment = async (req: any, res: any) => {
    try {
        const enrollments = await EnrollmentModel.find().lean();

        res.status(200).json(enrollments);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// createEnrollment Controller
export const createEnrollment = async (req: any, res: any) => {
    try {
        const { sid } = req.body;

        const date = new Date(Date.now()).toLocaleDateString(undefined, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        const enrollment = new EnrollmentModel({
            date,
            sid,
            uid: req.uid,
        });

        if (req.files?.img) {
            const result = await uploadEnrollmentProof(
                req.files.img.tempFilePath
            );
            enrollment.proof_img = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            await fs.unlink(req.files.img.tempFilePath);
        }
        await enrollment.save();

        res.status(201).json(enrollment);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// getEnrollmentById Controller
export const getEnrollmentById = async (req: any, res: any) => {
    try {
        const enrollment = await EnrollmentModel.findById(req.params.id);

        if (!enrollment)
            return res
                .status(404)
                .json({ message: 'Enrollment no encontrado' });
        res.status(200).json(enrollment);
    } catch (error: any) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// deleteEnrollment Controller
export const deleteEnrollment = async (req: any, res: any) => {
    try {
        const enrollment = await EnrollmentModel.findByIdAndDelete(
            req.params.id
        );

        if (!enrollment)
            return res
                .status(404)
                .json({ message: 'Enrollment no encontrado' });

        await deleteImage(enrollment.proof_img?.secure_url);
        res.status(204).json(enrollment);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

// updateEnrollment Controller
export const updateEnrollment = async (req: any, res: any) => {
    try {
        const updatedEnrollment = await EnrollmentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedEnrollment)
            return res
                .status(404)
                .json({ message: 'Enrollment no encontrado' });
        res.status(200).json(updatedEnrollment);
    } catch (error) {
        return res.status(500).json({ message: 'Formato id inválido' });
    }
};

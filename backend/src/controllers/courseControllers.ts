//Import tools
import { get } from 'http';
import CourseModel from '../models/CourseModel';
import { uploadCourseCover, deleteImage } from '../utils/cloudinary';
import fs from 'fs-extra';

// getAllCourse --> Line 10
// getAllCourseByCategory --> Line 23
// createCourse --> Line 30
// getCourse --> Line 44
// deleteCourse --> Line 57
// updateCourse --> Line 70

// getAllCourse Controller
export const getAllCourse = async (req: any, res: any) => {
    try {
        const courses = await CourseModel.find();
        res.status(200).json(courses);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// getAllCourseByCategory Controller
export const getAllCourseByCategory = async (req: any, res: any) => {
    try {
        const { category } = req.params;
        const coursesById = CourseModel.find({ category });
        res.status(200).json(coursesById);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// createCourse Controller
export const createCourse = async (req: any, res: any) => {
    try {
        const {
            initalDate,
            finalDate,
            title,
            category,
            tags,
            description,
            url,
            price,
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

        const newCourse = new CourseModel({
            creationDate,
            initalDate,
            finalDate,
            title,
            category,
            tags,
            description,
            url,
            price,
            pid,
        });

        if (req.files?.img) {
            const result = await uploadCourseCover(req.files.img.tempFilePath);
            newCourse.img = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            await fs.unlink(req.files.img.tempFilePath);
        }
        await newCourse.save();

        res.status(201).json(newCourse);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// getCourse Controller
export const getCourse = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const course = await CourseModel.findById(id);

        res.status(200).json(course);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// deleteCourse Controller
export const deleteCourse = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const course = await CourseModel.findByIdAndDelete(id);

        if (course?.img?.public_id) {
            await deleteImage(course.img.public_id);
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// updateCourse Controller
export const updateCourse = async (req: any, res: any) => {
    try {
        const updateCourse = await CourseModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updateCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(updateCourse);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

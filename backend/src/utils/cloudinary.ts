//Import Tools
import { v2 as cloudinary } from 'cloudinary';

//Set Clodinary config to connect to their API
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.CLOUD_API_KEY as string,
    api_secret: process.env.CLOUD_API_SECRET as string,
    secure: true,
});

//Upload logo to Cloudinary
export async function uploadProviderLogo(filePath: any) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'Provider',
    });
}
//Upload Save Proof to Cloudinary
export async function uploadSaveProof(filePath: any) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'Saves',
    });
}

//Upload Services cover to Cloudinary
export async function uploadServiceCover(filePath: any) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'Service',
    });
}

//Upload Enrollment proof to Cloudinary
export async function uploadEnrollmentProof(filePath: any) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'Enrollments',
    });
}

//Function to delete img from cloudinary by their public_id
export async function deleteImage(image: any) {
    return await cloudinary.uploader.destroy(image?.public_id);
}

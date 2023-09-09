//Import Tools
import { v2 as cloudinary } from 'cloudinary';

//Set Clodinary config to connect to their API
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.CLOUD_API_KEY as string,
    api_secret: process.env.CLOUD_API_SECRET as string,
    secure: true,
});

//Upload Services cover to Cloudinary
export async function uploadServiceCover(filePath: string) {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'Service',
    });
}

//Function to delete img from cloudinary by their public_id
export async function deleteImage(image: any) {
    return await cloudinary.uploader.destroy(image?.public_id);
}

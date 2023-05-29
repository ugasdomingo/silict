import CloudinaryService from '../class/CloudinaryServices';

const cloudinaryService = new CloudinaryService(
    process.env.CLOUD_NAME as string,
    process.env.CLOUD_API_KEY as string,
    process.env.CLOUD_API_SECRET as string
);

export async function uploadImage(filePath: any, folder: string) {
    return await cloudinaryService.uploadImage(filePath, folder);
}

export async function deleteImage(image: any) {
    return await cloudinaryService.deleteImage(image?.public_id);
}

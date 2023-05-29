import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

class CloudinaryService {
    private readonly cloudName: string;
    private readonly apiKey: string;
    private readonly apiSecret: string;

    constructor(cloudName: string, apiKey: string, apiSecret: string) {
        this.cloudName = cloudName;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        cloudinary.config({
            cloud_name: this.cloudName,
            api_key: this.apiKey,
            api_secret: this.apiSecret,
            secure: true,
        });
    }

    public async uploadImage(
        filePath: any,
        folder: string
    ): Promise<UploadApiResponse> {
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder,
            });
            return result;
        } catch (error: any) {
            console.log(error);
            throw error;
        }
    }

    public async deleteImage(publicId: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(publicId);
        } catch (error: any) {
            console.log(error);
            throw error;
        }
    }
}

export default CloudinaryService;

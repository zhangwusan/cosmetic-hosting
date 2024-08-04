import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createReadStream } from "fs";
import uniqid from "uniqid";

// Ensure necessary environment variables are set
const AWS_REGION = process.env.AWS_REGION as string;
const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY as string;
const AWS_S3_SECRET_KEY = process.env.AWS_S3_SECRET_KEY as string;
const AMPLIFY_BUCKET = process.env.AMPLIFY_BUCKET as string;

if (!AWS_REGION || !AWS_S3_ACCESS_KEY || !AWS_S3_SECRET_KEY || !AMPLIFY_BUCKET) {
    throw new Error("Missing required AWS environment variables.");
}

// Connect to Amazon S3
const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_S3_ACCESS_KEY,
        secretAccessKey: AWS_S3_SECRET_KEY,
    },
});

export default async function uploadImageToS3(file: File) {
    const ext = file.name.split('.').pop();
    const fileName = `${uniqid()}.${ext}`;

    const stream = file.stream() as unknown as NodeJS.ReadableStream;
    const chunks: Buffer[] = [];

    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }

    const buffer = Buffer.concat(chunks);

    await s3Client.send(new PutObjectCommand({
        Bucket: AMPLIFY_BUCKET,
        Key: fileName,
        ACL: 'public-read',
        ContentType: file.type,
        Body: buffer,
    }));

    return `https://${AMPLIFY_BUCKET}.s3.amazonaws.com/${fileName}`;
}
export async function UploadImageToS3(filePath: string, fileName: string, mimeType: string): Promise<string> {
    const bucket = AMPLIFY_BUCKET;

    try {
        await s3Client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: fileName,
            ACL: 'public-read',
            ContentType: mimeType,
            Body: createReadStream(filePath),
        }));

        return `https://${bucket}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw error;
    }
}

export async function removeImageFromS3(filename: string) {
    await s3Client.send(new DeleteObjectCommand({
        Bucket: AMPLIFY_BUCKET,
        Key: filename,
    }));

    return `https://${AMPLIFY_BUCKET}.s3.amazonaws.com/${filename}`;
}

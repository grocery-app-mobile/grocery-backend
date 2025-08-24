import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import mime from 'mime-types'; // Install via: npm install mime-types

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION ,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadFileToS3 = async (file, folderName) => {
  const bucketName = process.env.AWS_BUCKET_NAME || "mypos-new-app";
  console.log("Bucket name:", bucketName);

  const fileName = `${folderName}/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3.send(command);

  const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  return { Location: fileUrl };
};


export const uploadBase64ToS3 = async (fileName, filePath, base64Data) => {
  // Get mime type from file extension
  const mimeType = mime.lookup(fileName) || 'application/octet-stream';

  // Clean base64 (remove "data:..." if it exists)
  const matches = base64Data.match(/^data:(.+);base64,(.+)$/);
  const base64String = matches ? matches[2] : base64Data;

  const fileBuffer = Buffer.from(base64String, 'base64');
  const fullKey = `${filePath}/${Date.now()}-${fileName}`;
  const bucketName = process.env.AWS_BUCKET_NAME || "mypos-new-app";

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fullKey,
    Body: fileBuffer,
    ContentType: mimeType, // from fileName
  });

  await s3.send(command);

  return {
    Location: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fullKey}`,
  };
};


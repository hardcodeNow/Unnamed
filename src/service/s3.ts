// src/service/s3.ts
import {S3Client, PutObjectCommand, ListBucketsCommand} from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: "auto",
  endpoint: "https://s3.api.upyun.com",
  credentials: {
    accessKeyId: "d9c568b579254f8395da8564a4540d2a",
    secretAccessKey: "62bcdbab0aa0a7bf937d58652b06cabd",
  }
});

const AWS_BUCKET_NAME = "airbozh-halo"

export async function uploadToS3(
  base64Content: string,
  fileName: string,
  contentType: string
) {
  console.log('uploadToS3', fileName, contentType);
  // 解码 base64
  const buffer = Buffer.from(base64Content, 'base64');

  // 生成唯一的文件名
  const key = `uploads/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // 返回文件的 URL
  return `https://cdn.airbozh.cn/${key}`;
}

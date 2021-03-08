import fs from 'fs';
import mime from 'mime';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '../config/upload';

class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async savefile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const contenteType = mime.getType(originalPath);

    if (!contenteType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.Bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType: contenteType,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.Bucket,
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;

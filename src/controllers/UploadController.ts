import S3StorageProvider from '@storage/S3StorageProvider';
import { Request, Response } from 'express';

export default class UploadController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename } = request.file;

    const storageProvider = new S3StorageProvider();

    const file = await storageProvider.savefile(filename);

    const url = `https://vini-upload-test.s3-sa-east-1.amazonaws.com/${file}`;

    return response.json(url);
  }
}

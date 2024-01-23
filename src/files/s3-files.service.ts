import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3FilesService {

    // AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    // AWS_S3_BUCKET = 'assets.timetrak';
    // AWS_S3_BUCKET = '';

    constructor(
        private readonly configService: ConfigService
    ) {
        // this.AWS_S3_BUCKET = this.configService.get('AWS_S3_BUCKET');
    }

    async upload(dataBuffer: Buffer, filename: string, mimetype: string, path?: string) {
        const s3 = new S3()
        const newFilename = (path)?`${path}/${uuid()}-${filename}`:`${uuid()}-${filename}`
        const uploadResult = await s3.upload({
                                    // Bucket: this.AWS_S3_BUCKET,
                                    Bucket: 'bowoot-images',
                                    Body: dataBuffer,
                                    Key: newFilename,
                                    ContentType: mimetype,
                                    ContentDisposition: "inline",
                                })
                                .promise();

        return {
            key: uploadResult.Key,
            url: uploadResult.Location
        };
    }

    async delete(fileKey: string) {
        const s3 = new S3();
        await s3.deleteObject({
            // Bucket: this.AWS_S3_BUCKET,
            Bucket: 'bowoot-images',
            Key: fileKey,
        }).promise();
    }
}

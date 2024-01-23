import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { S3FilesService } from './s3-files.service';

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [S3FilesService],
    exports: [S3FilesService]

})
export class FilesModule {}

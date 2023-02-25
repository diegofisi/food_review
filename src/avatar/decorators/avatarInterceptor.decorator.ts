import { BadRequestException, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageNamer } from '../helpers/avatarNamer.helper';

export const CustomImageInterceptor = (arg: string) => {
  return UseInterceptors(
    FilesInterceptor(arg, 3, {
      storage: diskStorage({
        destination: './static/products',
        filename: imageNamer,
      }),
      limits: {
        fileSize: 1024 * 1024 * 2,
      },
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(png|jpeg|jpg|gif)$/)) {
          return callback(
            new BadRequestException('just images and gifs are allowed'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  );
};

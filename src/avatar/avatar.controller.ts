import { Body, Controller, Post, UploadedFiles } from '@nestjs/common';
import { CustomImageInterceptor } from './decorators/avatarInterceptor.decorator';
import { FileValidatorsPipe } from './pipes/parseFile.pipe';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { AvatarService } from './avatar.service';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}
  @Post()
  @CustomImageInterceptor('files')
  uploadImage(
    @UploadedFiles(FileValidatorsPipe)
    files: Express.Multer.File[],
    @Body() createAvatarDto: CreateAvatarDto,
  ) {
    createAvatarDto;
    return this.avatarService.create(files);
  }
}

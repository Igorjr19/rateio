import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class GetUserByDocumentPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      return null;
    }
    return await this.userService.findByDocument(value);
  }
}

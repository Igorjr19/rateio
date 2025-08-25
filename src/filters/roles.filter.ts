import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import { InsufficientRoleError } from 'src/guards/roles.guard';

@Catch(ForbiddenException)
export class MultiRoleRouteFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const next = ctx.getNext();

    if (exception.message === InsufficientRoleError && next) {
      return next();
    }

    throw exception;
  }
}

import {
  Injectable,
  UnprocessableEntityException,
  ValidationPipe as BaseValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe extends BaseValidationPipe {
  constructor(options: ValidationPipeOptions = {}) {
    options.exceptionFactory = (originalErrors: ValidationError[]) => {
      const errors = originalErrors.map((error) => {
        if (error.children && error.children.length) {
          return {
            field: error.property,
            error: error.children.map((child) => {
              return Object.entries(child.constraints).map(
                ([, message]) => message,
              );
            }),
          };
        }

        return {
          field: error.property,
          error: Object.entries(error.constraints).map(
            ([, message]) => message,
          ),
        };
      });
      return new UnprocessableEntityException(errors);
    };

    super(options);
  }
}

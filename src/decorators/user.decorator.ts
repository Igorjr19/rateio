import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DecryptPipe } from 'src/pipes/decrypt.pipe';
import { GetUserByEmailPipe } from 'src/pipes/user.pipe';

const getAuthorizationHeader = (req) => {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader) {
    return null;
  }
  if (Array.isArray(authHeader)) {
    return authHeader[0];
  }
  return authHeader;
};

export const TokenDocument = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = getAuthorizationHeader(request);

    if (!authorization) {
      return null;
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      return null;
    }

    const decodedToken = jwt.decode(token) as object;
    const document = decodedToken['document'];

    return document;
  },
);

export const Email = () => TokenDocument(undefined, DecryptPipe);

export const User = () =>
  TokenDocument(undefined, DecryptPipe, GetUserByEmailPipe);

import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { DecryptPipe } from 'src/pipes/decrypt.pipe';
import { GetUserByDocumentPipe } from 'src/pipes/user.pipe';

const getAuthorizationHeader = (req: Request) => {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader) {
    return null;
  }
  if (Array.isArray(authHeader)) {
    return authHeader[0];
  }
  return authHeader;
};

export const getTokenFromRequest = (req: Request) => {
  const authorization = getAuthorizationHeader(req);

  if (!authorization) {
    return null;
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return null;
  }

  const decodedToken = jwt.decode(token) as object;

  return decodedToken;
};

export const TokenDocument = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const token = getTokenFromRequest(request);

    const document = token['document'];

    return document;
  },
);

export const Email = () => TokenDocument(undefined, DecryptPipe);

export const TokenUser = () =>
  TokenDocument(undefined, DecryptPipe, GetUserByDocumentPipe);

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

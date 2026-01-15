import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.headers['x-user-id'];

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      throw new UnauthorizedException('Missing or invalid x-user-id header');
    }

    request['userId'] = userId;
    return true;
  }
}

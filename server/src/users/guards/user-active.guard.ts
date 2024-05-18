import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class UserActive implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user.active) {
      throw new ForbiddenException('Account has been deactivated!');
    }
    return user.active;
  }
}

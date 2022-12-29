import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jsonWebToken from 'jsonwebtoken';

@Injectable()
export class GlobalPacienteGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    let token = req.headers.authorization;
    try {
      const validation = jsonWebToken.verify(token, 'PACIENTE');
      return true;
    } catch (err) {
      try {
        const validation = jsonWebToken.verify(token, 'SUPERUSER');
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}

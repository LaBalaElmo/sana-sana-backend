import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jsonWebToken from 'jsonwebtoken';

@Injectable()
export class DoctorEspecificoGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    let emailDoctor: string;
    if (req.body['emailDoctor'] === undefined) {
      emailDoctor = req.query['emailDoctor'];
    } else {
      emailDoctor = req.body['emailDoctor'];
    }
    let token = req.headers.authorization;
    // console.log(token);
    try {
      const validation = jsonWebToken.verify(token, 'DOCTOR');
      if (jsonWebToken.decode(token)['value'] === emailDoctor) {
        console.log(true);
        return true;
      } else {
        new Error('No es doctor');
      }
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

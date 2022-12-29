import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jsonWebToken from 'jsonwebtoken';

@Injectable()
export class PacienteDoctorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    let emailPaciente: string;
    if(req.body['emailPaciente'] === undefined){
      emailPaciente = req.query['emailPaciente'];
    }else{
      emailPaciente = req.body['emailPaciente'];
    }
    console.log(emailPaciente);
    let token = req.headers.authorization;
    try {
      const validation = jsonWebToken.verify(token, 'PACIENTE');
      if (jsonWebToken.decode(token)['value'] === emailPaciente) {
        console.log(true);
        return true;
      } else {
        new Error('no es paciente');
      }
    } catch (err) {
      try {
        const validation = jsonWebToken.verify(
          token,
          'DOCTOR',
        );
        return true;
      } catch (error) {
        try {
          const validation = jsonWebToken.verify(token, 'SUPERUSER');
          return true;
        } catch (error) {
          return false;
        }
      }
    }
  }
}

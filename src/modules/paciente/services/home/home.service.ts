import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/model/Paciente';
import { Repository } from 'typeorm';
import * as jsonWebToken from 'jsonwebtoken'
import { PerfilPService } from '../perfil/perfil.service';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    private perfilService: PerfilPService
  ) {}

  public async login(
    email: string,
    password: string,
  ): Promise<string | Paciente> {
    try {
      const obj = await this.pacienteRepository.findOneOrFail({
        emailPaciente: email,
        pass: password,
      });

      obj.token = (jsonWebToken.sign({value: email}, 'PACIENTE'));
      await this.perfilService.updatePerfilPaciente(obj.emailPaciente, obj);
      obj.pass = undefined;
      return obj;
    } catch (err) {
      return new Promise<string>((resolve, reject) => {
        resolve('Esta cuenta no existe');
      });
    }
  }

  public async register(paciente: Paciente) {
    try {
      await this.pacienteRepository.findOneOrFail({
        emailPaciente: paciente.emailPaciente,
      });
      return  {'mensaje':'Esta cuenta ya existe'}
    } catch (err) {
      this.pacienteRepository.save(paciente);
      return {'mensaje':'Registro exitoso'}
    }
  }
}

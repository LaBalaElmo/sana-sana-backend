import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/model/Doctor';
import { Paciente } from 'src/model/Paciente';
import { PacienteAlergia } from 'src/model/PacienteAlergia';
import { PerfilService } from 'src/modules/doctor/services/perfil/perfil.service';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class PerfilPService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,

    @InjectRepository(PacienteAlergia)
    private readonly pacienteAlergiaRepository: Repository<PacienteAlergia>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  public async getPerfilPaciente(email: string): Promise<Paciente> {
    const obj = await this.pacienteRepository.findOneOrFail({
      emailPaciente: email,
    });
    obj.pass = undefined;
    return obj;
  }

  async updatePerfilPaciente(
    email: string,
    paciente: QueryDeepPartialEntity<Paciente>,
  ): Promise<Paciente> {
    await this.pacienteRepository.update({ emailPaciente: email }, paciente);
    return this.getPerfilPaciente(email);
  }

  async getAlergias(email: string): Promise<PacienteAlergia[]> {
    const obj = await this.pacienteRepository.findOne({
      where: {
        emailPaciente: email,
      },
      relations: ['pacientesAlergias', 'pacientesAlergias.idAlergia2'],
    });
    return obj.pacientesAlergias;
  }

  async postAlergias(
    pacienteAlergia: PacienteAlergia,
  ): Promise<PacienteAlergia[] | {mensaje:string}> {
    try {
      await this.pacienteAlergiaRepository.findOneOrFail({
        idAlergia: pacienteAlergia.idAlergia,
        emailPaciente: pacienteAlergia.emailPaciente,
      });
      return {'mensaje':'Esta alergia ya esta registrada en el perfil del paciente'};
    } catch (error) {
      await this.pacienteAlergiaRepository.save(pacienteAlergia);
      return this.getAlergias(pacienteAlergia.emailPaciente);
    }
  }

  async updateAlergias(
    idPacienteAlergia: number,
    pacienteAlergia: PacienteAlergia,
  ): Promise<PacienteAlergia[] | string> {
    await this.pacienteAlergiaRepository.update(
      idPacienteAlergia,
      pacienteAlergia,
    );
    return this.getAlergias(pacienteAlergia.emailPaciente);
  }

  async deletePerfil(emailPaciente: string) {
    await this.pacienteRepository.delete({ emailPaciente: emailPaciente });
    return {'mensaje':'Perfil eliminado correctamente'};
  }

  async deleteAlergia(idAlergia: number) {
    await this.pacienteAlergiaRepository.delete({ id: idAlergia });
    return {'mensaje':'Alergia eliminada de perfil correctamente'};
  }

  async puntuarDoctor(rank: number, doctor: QueryDeepPartialEntity<Doctor>) {
    const newRank =
      (+doctor.ranks * +doctor.nroPuntuaciones) /
        (+doctor.nroPuntuaciones + 1) +
      rank / (+doctor.nroPuntuaciones + 1);
    doctor.ranks = Math.round(newRank);
    doctor.nroPuntuaciones = +doctor.nroPuntuaciones + 1;
    await this.doctorRepository.update(
      { emailDoctor: doctor.emailDoctor + '' },
      { ranks: newRank, nroPuntuaciones: doctor.nroPuntuaciones },
    );
    return 'Muchas gracias por puntuar';
  }

  async buscarPacientes(word: string): Promise<Paciente[]> {
    return await this.pacienteRepository
      .createQueryBuilder('paciente')
      .where('paciente.nombre like :name', { name: `%${word}%` })
      
      .getMany();
  }
}

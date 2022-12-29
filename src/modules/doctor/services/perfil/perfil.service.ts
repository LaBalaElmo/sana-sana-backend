import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitaMedica } from 'src/model/CitaMedica';
import { Doctor } from 'src/model/Doctor';
import { DoctorEspecialidad } from 'src/model/DoctorEspecialidad';
import { Documento } from 'src/model/Documento';
import { Repository} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class PerfilService {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,

        @InjectRepository(DoctorEspecialidad)
        private readonly doctorEspecialidadRepository: Repository<DoctorEspecialidad>,

        @InjectRepository(Documento)
        private readonly documentoRepository: Repository<Documento>,
    ){}

    async getPerfilDoctor(emailDoctor: string): Promise<Doctor>{
        const obj = await this.doctorRepository.findOne({
            where: {emailDoctor: emailDoctor},
            relations: ['doctorEspecialidades', 'doctorEspecialidades.idEspecialidad2', 'documentos']
        });
        obj.pass = '';
        return obj;
    }

    async updatePerfilDoctor(emailDoctor: string, doctor: QueryDeepPartialEntity<Doctor>): Promise<Doctor>{
        await this.doctorRepository.update({emailDoctor: emailDoctor}, doctor);
        return this.getPerfilDoctor(emailDoctor);
    }

    async addDocumento(emailDoctor: string, documento: Documento): Promise<Documento[]>{
        await this.documentoRepository.save(documento);
        return this.getAllDocuments(emailDoctor);
    }

    async getAllDocuments(emailDoctor: string): Promise<Documento[]>{
        const obj = await this.doctorRepository.findOne({
            where: {
                emailDoctor: emailDoctor
            },
            relations: ['documentos']
        });
        return obj.documentos;
    }

    async getDocument(idDocumento: number): Promise<Documento>{
        return await this.documentoRepository.findOne({id: idDocumento});
    }

    async addEspecialidad(doctorEspecialidad: DoctorEspecialidad): Promise<Doctor>{
        await this.doctorEspecialidadRepository.save(doctorEspecialidad);
        return this.getPerfilDoctor(doctorEspecialidad.emailDoctor);
    }

    async deletePerfil(emailDoctor: string){
        await this.doctorRepository.delete({emailDoctor: emailDoctor});
        return {"mensaje": 'Perfil eliminado correctamente'};
    }

    async updateDocumento(id: number, documento: Documento){
        await this.documentoRepository.update({id: id}, documento);
        return this.getAllDocuments(documento.emailDoctor);
    }

    async deleteDocumento(idDocumento: number){
        await this.documentoRepository.delete({id: idDocumento});
        return 'Documento eliminado correctamente';
    }

    async getHorarios(emailDoctor: String): Promise<string[]> {
        const obj = await this.doctorRepository.findOne({
            where: {
                emailDoctor: emailDoctor
            }
        });
        // console.log(obj)
        return obj.horario;
    }

    async buscarDoctores(word: string): Promise<Doctor[]>{
        return await this.doctorRepository.createQueryBuilder('doctor')
        .where("doctor.nombre like :name", { name:`%${word}%`})
        .innerJoinAndSelect('doctor.doctorEspecialidades', 'dp').innerJoinAndSelect('dp.idEspecialidad2', 'de')
        .orderBy("doctor.ranks", "DESC")
        .getMany();
    }

    // async updateHorario(emailDoctor: string, doctor: Doctor){
    //     await this.doctorRepository.update({emailDoctor: emailDoctor}, doctor);
    //     return this.getAllDocuments(documento.emailDoctor);
    // }
}

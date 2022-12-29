import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidad } from 'src/model/Especialidad';
import { Repository } from 'typeorm';

@Injectable()
export class EspecialidadService {
    constructor(
        @InjectRepository(Especialidad)
        private readonly especialidadRepositor: Repository<Especialidad>
    ){}

    async createEspecialidad(especialidad: Especialidad): Promise<{mensaje:string}>{
        try {
            await this.especialidadRepositor.save(especialidad);
            return {'mensaje':'Se guardo la especialidad exitosamente'};
        } catch (error) {
            return {'mensaje':'No se guardo la especialidad'};
        }
    }

    async deleteEspecialidad(idEspecialidad: number): Promise<{mensaje:string}>{
        try {
            await this.especialidadRepositor.delete({id: idEspecialidad})
            return {'mensaje':'Se borro la especialidad correctamente'}
        } catch (error) {
            return {'mensaje':'Error al momento de borrar'}
        }
    }

    async buscarEspecialidad(word: string): Promise<Especialidad[]>{
        return await this.especialidadRepositor.createQueryBuilder('especialidad')
        .where("especialidad.nombre like :name", { name:`%${word}%`})
        .getMany();
    }

    async updateEspecialidad(idEspecialidad: number, especialidad: Especialidad){
        await this.especialidadRepositor.update({id: idEspecialidad}, especialidad);
        return {'mensaje':'Se actualizo correctamente'};
    }
}

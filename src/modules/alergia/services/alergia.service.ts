import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alergia } from 'src/model/Alergia';
import { Repository } from 'typeorm';

@Injectable()
export class AlergiaService {
    constructor(
        @InjectRepository(Alergia)
        private readonly alergiaRepositor: Repository<Alergia>
    ){}

    async createAlergia(alergia: Alergia): Promise<{mensaje:string}>{
        try {
            await this.alergiaRepositor.save(alergia);
            return {'mensaje':'Se guardo la alergia exitosamente'};
        } catch (error) {
            return {'mensaje':'No se guardo la alergia'};
        }
    }

    async deleteAlergia(idAlergia: number): Promise<{mensaje:string}>{
        try {
            await this.alergiaRepositor.delete({id: idAlergia})
            return {'mensaje':'Se borro la alergia correctamente'}
        } catch (error) {
            return {'mensaje':'Error al momento de borrar'}
        }
    }

    async buscarAlergias(word: string): Promise<Alergia[]>{
        return await this.alergiaRepositor.createQueryBuilder('alergia')
        .where("alergia.nombre like :name", { name:`%${word}%`})
        .getMany();
    }

    async updateAlergia(idAlergia: number, alergia: Alergia){
        await this.alergiaRepositor.update({id: idAlergia}, alergia);
        return {'mensaje':'Se actualizo correctamente'};
    }
}

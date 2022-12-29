import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitaMedica } from 'src/model/CitaMedica';
import { Doctor } from 'src/model/Doctor';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class HistorialMedicoService {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,

        @InjectRepository(CitaMedica)
        private readonly citaMedicaRepository: Repository<CitaMedica>
    ){}

    async getHistorial(emailDoctor: string): Promise<CitaMedica[]>{
        const obj = await this.doctorRepository.findOne({
            where: {
                emailDoctor: emailDoctor
            },
            relations: ['citasMedicas']
        });
        return obj.citasMedicas;
    }

    async updateCita(idCita: number, cita: CitaMedica): Promise<string>{
        await this.citaMedicaRepository.update({id: idCita}, cita);
        return 'Se actualizo la cita correctamente'
    }
    
    async cancelarCita(idCita: number): Promise<string>{
        try {
            this.citaMedicaRepository.delete({id: idCita})
            return 'Se cancelo la cita exitosamente';
        } catch (error) {
            return 'Error al cancelar la cita'
        }
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitaMedica } from 'src/model/CitaMedica';
import { Paciente } from 'src/model/Paciente';
import { Repository } from 'typeorm';

@Injectable()
export class ConsultaMedicaService {
    constructor(
        @InjectRepository(CitaMedica)
        private readonly citaMedicaRepository: Repository<CitaMedica>,

        @InjectRepository(Paciente)
        private readonly pacienteRepository: Repository<Paciente>
    ){}
    
    hacerCita(citaMedica: CitaMedica): Promise<CitaMedica>{
        return this.citaMedicaRepository.save(citaMedica);
    }

    async getHistorialPaciente(emailPaciente: string): Promise<CitaMedica[]>{
        console.log(emailPaciente);
        const obj = await this.pacienteRepository.findOne({
            where: {
                emailPaciente: emailPaciente
            },
            relations: ['citasMedicas']
        });
        console.log(obj);
        return obj.citasMedicas;
    }

    async cancelarCita(idCita: number): Promise<{mensaje: string}>{
        try {
            this.citaMedicaRepository.delete({id: idCita})
            return { "mensaje": 'Se cancelo la cita exitosamente'}
        } catch (error) {
            return { "mensaje": 'Error al cancelar la cita'}
        }
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/model/Doctor';
import { Repository } from 'typeorm';
import * as jsonWebToken from 'jsonwebtoken'
import { PerfilService } from '../perfil/perfil.service';
import { randomInt } from 'crypto';

@Injectable()
export class HomeService {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        private servicePerfil: PerfilService
    ){}

    public async login(email: string, password: string): Promise<string | Doctor>{
        try {
            const obj = await this.doctorRepository.findOneOrFail({emailDoctor: email, pass: password});
            if(obj.superuser){
                obj.token = (jsonWebToken.sign({value: email}, 'SUPERUSER'));
            }else{
                obj.token = (jsonWebToken.sign({value: email}, 'DOCTOR'));
            }
            await this.servicePerfil.updatePerfilDoctor(obj.emailDoctor, obj);
            obj.pass = undefined;
            return obj;
        } catch (err) {
            return new Promise<string>((resolve, reject) => {resolve('Esta cuenta no existe')});
        }
    }

    public async register(doctor: Doctor) {
        try {
            await this.doctorRepository.findOneOrFail({emailDoctor: doctor.emailDoctor})
            return  {'mensaje':'Esta cuenta ya existe'}
        } catch (err) {
            this.doctorRepository.save(doctor);
            return {'mensaje':'Registro exitoso'}
        }
        
    }
}

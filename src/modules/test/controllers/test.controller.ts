import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Usuario } from 'src/model/Usuario';
import { TestService } from '../services/test.service';
import * as jsonWebToken from 'jsonwebtoken';
import { UseGuards } from '@nestjs/common';
import { GlobalPacienteGuard } from '../../guards/global-paciente.guard';
import { GlobalDoctorGuard } from '../../guards/global-doctor.guard';

@Controller('test')
export class TestController {

    constructor(
        public testService: TestService
    ) { }
    @Post('create')
    postUser(@Body() usuario: Usuario): Promise<Usuario> {
        return this.testService.create(usuario);
    }


    @Get('readAllpac')
    @UseGuards(GlobalPacienteGuard)
    getAllpac() {
        return this.testService.readAll();
    }

    @Get('readAlldoc')
    @UseGuards(GlobalDoctorGuard)
    getAlldoc() {
        return this.testService.readAll();
    }

    @Get('read/:id')
    get(@Param('id') id: number) {
        return this.testService.read(id)
    }

    @Put('put/:id')
    put(@Param('id') id: number, @Body() usuario: Usuario) {
        return this.testService.update(id, usuario)
    }

    @Delete('delete/:id')
    del(@Param('id') id: number) {
        return this.testService.delete(id)
    }


    @Get('test')
    getUsersTest() {
        return this.testService.getUsersTest();
    }

    @Get('tokenpaciente')
    tokencreatepac(){
        const token = jsonWebToken.sign({value:'paciente'},'PACIENTE')
        return {token:token}
    }

    @Get('tokendoctor')
    tokencreatedoc(){
        const token = jsonWebToken.sign({value:'doctor'},'DOCTOR')
        return {token:token}
    }
}

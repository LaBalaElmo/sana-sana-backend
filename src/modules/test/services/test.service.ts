import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/model/Usuario';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  usersTest: Usuario[] = [
    {
      idUsuario: 1,
      username: 'uno',
      password: 'uno',
      name: 'uno',
      creationDate: new Date(),
      state: 1,
    },
    {
      idUsuario: 2,
      username: 'dos',
      password: 'uno',
      name: 'dos',
      creationDate: new Date(),
      state: 2,
    },
    {
      idUsuario: 3,
      username: 'tres',
      password: 'tres',
      name: 'tres',
      creationDate: new Date(),
      state: 3,
    },
  ];
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async readAll() {
    return await this.usuarioRepo.find();
  }

  async create(data: Usuario) {
    return this.usuarioRepo.save(data);
  }

  async read(id: number) {
    return await this.usuarioRepo.findOne({ where: { idUsuario: id } });
  }

  async update(id: number, data: Usuario) {
    return await this.usuarioRepo.update(id, data);
  }

  async delete(id: number) {
    return await this.usuarioRepo.delete(id);
    }
    

    async getUsersTest(): Promise<Usuario[]>{
        return this.usersTest;
    }
}

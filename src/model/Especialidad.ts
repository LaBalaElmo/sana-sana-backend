import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DoctorEspecialidad } from "./DoctorEspecialidad";

@Index("pk_especialidad", ["id"], { unique: true })
@Entity("especialidad", { schema: "public" })
export class Especialidad {
  @ApiProperty({
    description: 'Id de la especialidad',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @PrimaryGeneratedColumn({ type: "integer", name: "id_especialidad" })
  id: number;

  @ApiProperty({
    description: 'Nombre de la especialidad',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("character varying", { name: "nombre", length: 250 })
  nombre: string;

  @ApiProperty({
    description: 'Descripción de la especialidad',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("character varying", { name: "descripcion", length: 250 })
  descripcion: string;

  @OneToMany(() => DoctorEspecialidad, (doctorEspecialidad) => doctorEspecialidad.idEspecialidad2, {onDelete: 'CASCADE'})
  doctorEspecialidades: DoctorEspecialidad[];
}
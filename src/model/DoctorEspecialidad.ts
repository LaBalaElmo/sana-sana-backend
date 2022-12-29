import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";
import { Especialidad } from "./Especialidad";

@Index("pk_doctorEspecialidad", ["id"], { unique: true })
@Entity("doctorEspecialidad", { schema: "public" })
export class DoctorEspecialidad {
  @ApiProperty({
    description: 'Id de la relación entre un doctor y una especialidad',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @PrimaryGeneratedColumn({ type: "integer", name: "idDoctorEspecialidad" })
  id: number;

  @ApiProperty({
    description: 'Email del doctor relacionado con la especialidad',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("string")
  emailDoctor: string;

  @ApiProperty({
    description: 'Id de la especialidad relacionada con el doctor',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("integer")
  idEspecialidad: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.doctorEspecialidades, {onDelete: 'CASCADE'})
  @JoinColumn([{ name: "emailDoctor", referencedColumnName: "emailDoctor" }])
  idDoctor2: Doctor;

  @ManyToOne(() => Especialidad, (especialidad) => especialidad.doctorEspecialidades)
  @JoinColumn([{ name: "idEspecialidad", referencedColumnName: "id" }])
  idEspecialidad2: Especialidad;
}
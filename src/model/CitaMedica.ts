import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";
import { Paciente } from "./Paciente";

@Index("pk_citaMedica", ["id"], { unique: true })
@Entity("citaMedica", { schema: "public" })
export class CitaMedica {
  @ApiProperty({
    description: 'Id de la Cita',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @PrimaryGeneratedColumn({ type: "integer", name: "idCitaMedica" })
  id: number;

  @ApiProperty({
    description: 'Email del doctor encargado de la cita',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("string")
  emailDoctor: string;

  @ApiProperty({
    description: 'Email del paciente que pidió la cita',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("string")
  emailPaciente: string;

  @ApiProperty({
    description: 'Fecha en la que se llevará a cabo la cita',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("character varying", { name: "fecha" })
  fecha: string;

  @ApiProperty({
    description: 'Hora en la que se llevará a cabo la cita',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("character varying")
  hora: string;

  @ApiProperty({
    description: 'Observaciones que se hicieron en la cita',
    minimum: 1,
    maximum: 1,
    required: false
  })
  @Column("character varying", {nullable: true})
  observaciones: string;

  @ApiProperty({
    description: 'Peso registrado en la cita del paciente',
    minimum: 1,
    maximum: 1,
    required: false
  })
  @Column("float", {nullable: true})
  peso: number;

  @ApiProperty({
    description: 'Tamaño registrado en la cita del paciente',
    minimum: 1,
    maximum: 1,
    required: false
  })
  @Column("float", {nullable: true})
  tamanho: number;

  @ApiProperty({
    description: 'Problema que tiene el paciente',
    minimum: 1,
    maximum: 1,
    required: false
  })
  @Column("character varying", {nullable: true})
  problema: string;

  @ApiProperty({
    description: 'Estado de la cita',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("boolean", {nullable: true})
  estado: boolean;

  @ApiProperty({
    description: 'Link de la reunion',
    minimum: 1,
    maximum: 1,
    required: false
  })
  @Column("character varying", {nullable: true})
  link: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.citasMedicas, {onDelete: 'CASCADE'})
  @JoinColumn([{ name: "emailDoctor", referencedColumnName: "emailDoctor" }])
  idDoctor2: Doctor;

  @ManyToOne(() => Paciente, (paciente) => paciente.citasMedicas, {onDelete: 'CASCADE'})
  @JoinColumn([{ name: "emailPaciente", referencedColumnName: "emailPaciente" }])
  idPaciente2: Paciente;
}
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Index, OneToMany, PrimaryColumn} from "typeorm";
import { CitaMedica } from "./CitaMedica";
import { PacienteAlergia } from "./PacienteAlergia";

@Index("pk_paciente", ["emailPaciente"], { unique: true })
@Entity("paciente", { schema: "public" })
export class Paciente {
  @ApiProperty({
    description: 'Email del paciente',
    minimum: 1,
    maximum: 1,
    required: true,
  })
  @PrimaryColumn({ type: "character varying", name: "emailPaciente" })
  emailPaciente: string;

  @ApiProperty({
    description: 'Nombre de usuario que el paciente utilizará para ingresar a la aplicación',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("character varying", { name: "username", length: 250 })
  username: string;

  @ApiProperty({
    description: 'Contraseña que el paciente utilizará para ingresar a la aplicación',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("character varying", { name: "pass", length: 250 })
  pass: string;

  @ApiProperty({
    description: 'Nombre del paciente',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("character varying", { name: "nombre", length: 250 })
  nombre: string;

  @ApiProperty({
    description: 'Apellido del paciente',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("character varying", { name: "apellido", length: 250 })
  apellido: string;

  @ApiProperty({
    description: 'Edad del paciente',
    minimum: 1,
    maximum: 1,
    required: true,
  })
  @Column("integer")
  edad: number;

  @ApiProperty({
    description: 'Tipo de sangre del paciente',
    minimum: 1,
    maximum: 1,
    required: false,
  })
  @Column("character varying", {nullable: true})
  tipoSangre: string;

  @ApiProperty({
    description: 'Token de acceso a la aplicación',
    minimum: 1,
    maximum: 1,
    required: false
  })
  @Column("character varying", {nullable: true})
  token: string;

  @ApiProperty({
    description: 'Fecha de nacimiento del paciente',
    minimum: 1,
    maximum: 1,
    required: false,
  })
  @Column("timestamp without time zone", { name: "fechaNacimiento", nullable: true})
  fechaNacimiento: Date;

//   @ManyToMany(type => Rol) @JoinTable() 
//   roles: Rol[];

  @OneToMany(() => CitaMedica, (citaMedica) => citaMedica.idPaciente2)
  citasMedicas: CitaMedica[];

  @OneToMany(() => PacienteAlergia, (pacienteAlergia) => pacienteAlergia.idPaciente2)
  pacientesAlergias: PacienteAlergia[];
}
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Index, OneToMany, PrimaryColumn} from "typeorm";
import { CitaMedica } from "./CitaMedica";
import { DoctorEspecialidad } from "./DoctorEspecialidad";
import { Documento } from "./Documento";

@Index("pk_doctor", ["emailDoctor"], { unique: true })
@Entity("doctor", { schema: "public" })
export class Doctor {
  @ApiProperty({
    description: 'Email del doctor',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @PrimaryColumn({ type: "character varying", name: "emailDoctor" })
  emailDoctor: string;

  @ApiProperty({
    description: 'Nombre de usuario que el doctor utilizará para ingresar a la aplicación',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength: 250
  })
  @Column("character varying", { name: "username", length: 250 })
  username: string;

  @ApiProperty({
    description: 'Contraseña que el doctor utilizará para ingresar a la aplicación',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength: 250
  })
  @Column("character varying", { name: "pass", length: 250 })
  pass: string;

  @ApiProperty({
    description: 'Nombre del doctor',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength: 250
  })
  @Column("character varying", { name: "nombre", length: 250 })
  nombre: string;

  @ApiProperty({
    description: 'Apellido del doctor',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength: 250
  })
  @Column("character varying", { name: "apellido", length: 250 })
  apellido: string;

  @ApiProperty({
    description: 'Horarios en los que el doctor está disponible para atender citas',
    minimum: 1,
    maximum: 1,
    required: false
  })
  @Column("character varying", { name: "horario", nullable: true , array: true})
  horario: string[];

  @ApiProperty({
    description: 'Puntuación del doctor dentro de la aplicación',
    minimum: 1,
    maximum: 1,
    required: false
  })
  @Column("float", {nullable: true})
  ranks: number;

  @Column("character varying", {nullable: true})
  nroPuntuaciones: number

  @ApiProperty({
    description: 'Permisos que tiene el doctor',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("boolean")
  superuser: boolean;
  
  @ApiProperty({
    description: 'Token de acceso a la aplicación',
    minimum: 1,
    maximum: 1,
    required: false
  })
  @Column("character varying", {nullable: true})
  token: string;

//   @Column("timestamp without time zone", { name: "fecha_creacion" })
//   fechaCreacion: Date;

//   @ManyToMany(type => Rol) @JoinTable() 
//   roles: Rol[];

  @OneToMany(() => CitaMedica, (citaMedica) => citaMedica.idDoctor2)
  citasMedicas: CitaMedica[];

  @OneToMany(() => Documento, (documento) => documento.idDoctor2)
  documentos: Documento[];

  @OneToMany(() => DoctorEspecialidad, (doctorEspecialidad) => doctorEspecialidad.idDoctor2)
  doctorEspecialidades: DoctorEspecialidad[];
}
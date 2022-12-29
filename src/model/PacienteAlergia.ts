import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alergia } from "./Alergia";
import { Paciente } from "./Paciente";

@Index("pk_pacienteAlergia", ["id"], { unique: true })
@Entity("pacienteAlergia", { schema: "public" })
export class PacienteAlergia {
  @ApiProperty({
    description: 'Id de la relación entre un paciente y una alergia',
    minimum: 1,
    maximum: 1,
    required: true,
  })
  @PrimaryGeneratedColumn({ type: "integer", name: "idPacienteAlergia" })
  id: number;

  @ApiProperty({
    description: 'Id de la alergia relacionada con el paciente',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("integer")
  idAlergia: number;

  @ApiProperty({
    description: 'Email del paciente relacionado con la alergia',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("string")
  emailPaciente: string;

  @ManyToOne(() => Alergia, (alergia) => alergia.pacientesAlergias, {onDelete: 'CASCADE'})
  @JoinColumn([{ name: "idAlergia", referencedColumnName: "id" }])
  idAlergia2: Alergia;

  @ManyToOne(() => Paciente, (paciente) => paciente.pacientesAlergias, {onDelete: 'CASCADE'})
  @JoinColumn([{ name: "emailPaciente", referencedColumnName: "emailPaciente" }])
  idPaciente2: Paciente;
}
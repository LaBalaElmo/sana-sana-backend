import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PacienteAlergia } from "./PacienteAlergia";

@Index("pk_alergia", ["id"], { unique: true })
@Entity("alergia", { schema: "public" })
export class Alergia {
  @ApiProperty({
    description: 'Id de la Alergia',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @PrimaryGeneratedColumn({ type: "integer", name: "idAlergia" })
  id: number;

  @ApiProperty({
    description: 'Nombre de la Alergia',
    minimum: 1,
    maximum: 1,
    maxLength: 250,
    required: true
  })
  @Column("character varying", { name: "nombre", length: 250 })
  nombre: string;

  @ApiProperty({
    description: 'Descripción de la Alergia',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("character varying", { name: "descripcion"})
  descripcion : string;

  @OneToMany(() => PacienteAlergia, (pacienteAlergia) => pacienteAlergia.idAlergia2, {onDelete: 'CASCADE'})
  pacientesAlergias: PacienteAlergia[];
}
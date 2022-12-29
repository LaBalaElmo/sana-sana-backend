import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./Doctor";

@Index("pk_documento", ["id"], { unique: true })
@Entity("documento", { schema: "public" })
export class Documento {
  @ApiProperty({
    description: 'Id de la relación entre un doctor y un documento',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @PrimaryGeneratedColumn({ type: "integer", name: "idDocumento" })
  id: number;

  @ApiProperty({
    description: 'Email del doctor relacionado con el documento',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("string")
  emailDoctor: string;

  @ApiProperty({
    description: 'Nombre del titulo recibido',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column()
  nombre: string;

  @ApiProperty({
    description: 'Tipo de documento\nEj: Título de Bachillerato',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("character varying", { name: "tipo", length: 250 })
  tipo: string;

  @ApiProperty({
    description: 'Entidad que emitió el documento',
    minimum: 1,
    maximum: 1,
    required: true,
    maxLength:250
  })
  @Column("character varying", { name: "emitidoPor", length: 250 })
  emitidoPor: string;

  @ApiProperty({
    description: 'Fecha de emisión del documento',
    minimum: 1,
    maximum: 1,
    required: true
  })
  @Column("timestamp without time zone", { name: "fechaEmision" })
  fechaEmicion: Date;

  // Imagen TO-DO

  @ManyToOne(() => Doctor, (doctor) => doctor.documentos, {onDelete: 'CASCADE'})
  @JoinColumn([{ name: "emailDoctor", referencedColumnName: "emailDoctor" }])
  idDoctor2: Doctor;
}
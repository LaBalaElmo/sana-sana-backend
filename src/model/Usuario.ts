import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Index("pk_usuario", ["idUsuario"], { unique: true })
@Entity("usuario", { schema: "public" })
export class Usuario {

  @Column("character varying", {name: "username", length: 250})
  username:string

  @Column("character varying", {name: "password", length: 250})
  password:string

  @Column("character varying", {name: "name", length: 250})
  name:string

  @Column("timestamp without time zone", {name: "creation_date"})
  creationDate:Date

  @Column("integer", {name: "state", nullable:true})
  state:number | null;

  @PrimaryGeneratedColumn({ type: "integer", name: "id_usuario" })
  idUsuario: number;

}

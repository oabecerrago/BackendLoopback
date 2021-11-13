import {Entity, model, property, hasMany} from '@loopback/repository';
import {Estudiante} from './estudiante.model';

@model({settings: {strict: false}})
export class Registro extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  registro_fecha: string;

  @property({
    type: 'boolean',
    required: true,
  })
  registro_acceso: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  registro_salida: boolean;

  @property({
    type: 'string',
    required: true,
  })
  registro_historial: string;

  @property({
    type: 'string',
    required: true,
  })
  estudianteId: string;

  @property({
    type: 'string',
    required: true,
  })
  profesorId: string;

  @hasMany(() => Estudiante)
  estudiantes: Estudiante[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Registro>) {
    super(data);
  }
}

export interface RegistroRelations {
  // describe navigational properties here
}

export type RegistroWithRelations = Registro & RegistroRelations;

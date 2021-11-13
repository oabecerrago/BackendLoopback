import {Entity, model, property, hasOne} from '@loopback/repository';
import {Registro} from './registro.model';

@model()
export class Profesor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo_id: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_documento: string;

  @property({
    type: 'number',
    required: true,
  })
  edad: number;

  @property({
    type: 'string',
    required: true,
  })
  genero: string;

  @property({
    type: 'string',
    required: true,
  })
  curso_asignado: string;

  @property({
    type: 'string',
  })
  facultadId?: string;

  @hasOne(() => Registro)
  registro: Registro;

  constructor(data?: Partial<Profesor>) {
    super(data);
  }
}

export interface ProfesorRelations {
  // describe navigational properties here
}

export type ProfesorWithRelations = Profesor & ProfesorRelations;

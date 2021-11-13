import {Entity, model, property, hasOne} from '@loopback/repository';
import {Facultad} from './facultad.model';
import {Registro} from './registro.model';

@model()
export class Estudiante extends Entity {
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
  Apellido: string;

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
  carrera: string;
  @property({
    type: 'string',
  })
  facultadId?: string;

  @hasOne(() => Facultad)
  facultad: Facultad;

  @hasOne(() => Registro)
  registro: Registro;

  @property({
    type: 'string',
  })
  registroId?: string;

  constructor(data?: Partial<Estudiante>) {
    super(data);
  }
}

export interface EstudianteRelations {
  // describe navigational properties here
}

export type EstudianteWithRelations = Estudiante & EstudianteRelations;

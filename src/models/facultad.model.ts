import {Entity, model, property, hasMany} from '@loopback/repository';
import {Estudiante} from './estudiante.model';
import {Profesor} from './profesor.model';

@model()
export class Facultad extends Entity {
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
  facultad_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  facultad_direccion: string;

  @hasMany(() => Estudiante)
  estudiantes: Estudiante[];

  @property({
    type: 'string',
  })
  estudianteId?: string;

  @hasMany(() => Profesor)
  profesors: Profesor[];

  constructor(data?: Partial<Facultad>) {
    super(data);
  }
}

export interface FacultadRelations {
  // describe navigational properties here
}

export type FacultadWithRelations = Facultad & FacultadRelations;

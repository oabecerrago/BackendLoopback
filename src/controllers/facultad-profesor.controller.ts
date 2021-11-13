import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Facultad,
  Profesor,
} from '../models';
import {FacultadRepository} from '../repositories';

export class FacultadProfesorController {
  constructor(
    @repository(FacultadRepository) protected facultadRepository: FacultadRepository,
  ) { }

  @get('/facultads/{id}/profesors', {
    responses: {
      '200': {
        description: 'Array of Facultad has many Profesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profesor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Profesor>,
  ): Promise<Profesor[]> {
    return this.facultadRepository.profesors(id).find(filter);
  }

  @post('/facultads/{id}/profesors', {
    responses: {
      '200': {
        description: 'Facultad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Profesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Facultad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {
            title: 'NewProfesorInFacultad',
            exclude: ['id'],
            optional: ['facultadId']
          }),
        },
      },
    }) profesor: Omit<Profesor, 'id'>,
  ): Promise<Profesor> {
    return this.facultadRepository.profesors(id).create(profesor);
  }

  @patch('/facultads/{id}/profesors', {
    responses: {
      '200': {
        description: 'Facultad.Profesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {partial: true}),
        },
      },
    })
    profesor: Partial<Profesor>,
    @param.query.object('where', getWhereSchemaFor(Profesor)) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.facultadRepository.profesors(id).patch(profesor, where);
  }

  @del('/facultads/{id}/profesors', {
    responses: {
      '200': {
        description: 'Facultad.Profesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Profesor)) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.facultadRepository.profesors(id).delete(where);
  }
}

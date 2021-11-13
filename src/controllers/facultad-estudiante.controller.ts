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
  Estudiante,
} from '../models';
import {FacultadRepository} from '../repositories';

export class FacultadEstudianteController {
  constructor(
    @repository(FacultadRepository) protected facultadRepository: FacultadRepository,
  ) { }

  @get('/facultads/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Array of Facultad has many Estudiante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Estudiante>,
  ): Promise<Estudiante[]> {
    return this.facultadRepository.estudiantes(id).find(filter);
  }

  @post('/facultads/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Facultad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estudiante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Facultad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {
            title: 'NewEstudianteInFacultad',
            exclude: ['id'],
            optional: ['facultadId']
          }),
        },
      },
    }) estudiante: Omit<Estudiante, 'id'>,
  ): Promise<Estudiante> {
    return this.facultadRepository.estudiantes(id).create(estudiante);
  }

  @patch('/facultads/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Facultad.Estudiante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {partial: true}),
        },
      },
    })
    estudiante: Partial<Estudiante>,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.facultadRepository.estudiantes(id).patch(estudiante, where);
  }

  @del('/facultads/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Facultad.Estudiante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.facultadRepository.estudiantes(id).delete(where);
  }
}

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
  Registro,
  Estudiante,
} from '../models';
import {RegistroRepository} from '../repositories';

export class RegistroEstudianteController {
  constructor(
    @repository(RegistroRepository) protected registroRepository: RegistroRepository,
  ) { }

  @get('/registros/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Array of Registro has many Estudiante',
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
    return this.registroRepository.estudiantes(id).find(filter);
  }

  @post('/registros/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Registro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estudiante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Registro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {
            title: 'NewEstudianteInRegistro',
            exclude: ['id'],
            optional: ['registroId']
          }),
        },
      },
    }) estudiante: Omit<Estudiante, 'id'>,
  ): Promise<Estudiante> {
    return this.registroRepository.estudiantes(id).create(estudiante);
  }

  @patch('/registros/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Registro.Estudiante PATCH success count',
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
    return this.registroRepository.estudiantes(id).patch(estudiante, where);
  }

  @del('/registros/{id}/estudiantes', {
    responses: {
      '200': {
        description: 'Registro.Estudiante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.registroRepository.estudiantes(id).delete(where);
  }
}

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
  Estudiante,
  Registro,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteRegistroController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/registro', {
    responses: {
      '200': {
        description: 'Estudiante has one Registro',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Registro),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Registro>,
  ): Promise<Registro> {
    return this.estudianteRepository.registro(id).get(filter);
  }

  @post('/estudiantes/{id}/registro', {
    responses: {
      '200': {
        description: 'Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Registro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registro, {
            title: 'NewRegistroInEstudiante',
            exclude: ['id'],
            optional: ['estudianteId']
          }),
        },
      },
    }) registro: Omit<Registro, 'id'>,
  ): Promise<Registro> {
    return this.estudianteRepository.registro(id).create(registro);
  }

  @patch('/estudiantes/{id}/registro', {
    responses: {
      '200': {
        description: 'Estudiante.Registro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registro, {partial: true}),
        },
      },
    })
    registro: Partial<Registro>,
    @param.query.object('where', getWhereSchemaFor(Registro)) where?: Where<Registro>,
  ): Promise<Count> {
    return this.estudianteRepository.registro(id).patch(registro, where);
  }

  @del('/estudiantes/{id}/registro', {
    responses: {
      '200': {
        description: 'Estudiante.Registro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Registro)) where?: Where<Registro>,
  ): Promise<Count> {
    return this.estudianteRepository.registro(id).delete(where);
  }
}

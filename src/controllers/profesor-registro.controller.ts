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
  Profesor,
  Registro,
} from '../models';
import {ProfesorRepository} from '../repositories';

export class ProfesorRegistroController {
  constructor(
    @repository(ProfesorRepository) protected profesorRepository: ProfesorRepository,
  ) { }

  @get('/profesors/{id}/registro', {
    responses: {
      '200': {
        description: 'Profesor has one Registro',
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
    return this.profesorRepository.registro(id).get(filter);
  }

  @post('/profesors/{id}/registro', {
    responses: {
      '200': {
        description: 'Profesor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Registro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Profesor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Registro, {
            title: 'NewRegistroInProfesor',
            exclude: ['id'],
            optional: ['profesorId']
          }),
        },
      },
    }) registro: Omit<Registro, 'id'>,
  ): Promise<Registro> {
    return this.profesorRepository.registro(id).create(registro);
  }

  @patch('/profesors/{id}/registro', {
    responses: {
      '200': {
        description: 'Profesor.Registro PATCH success count',
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
    return this.profesorRepository.registro(id).patch(registro, where);
  }

  @del('/profesors/{id}/registro', {
    responses: {
      '200': {
        description: 'Profesor.Registro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Registro)) where?: Where<Registro>,
  ): Promise<Count> {
    return this.profesorRepository.registro(id).delete(where);
  }
}

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
  Facultad,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteFacultadController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/facultad', {
    responses: {
      '200': {
        description: 'Estudiante has one Facultad',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Facultad),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Facultad>,
  ): Promise<Facultad> {
    return this.estudianteRepository.facultad(id).get(filter);
  }

  @post('/estudiantes/{id}/facultad', {
    responses: {
      '200': {
        description: 'Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Facultad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facultad, {
            title: 'NewFacultadInEstudiante',
            exclude: ['id'],
            optional: ['estudianteId']
          }),
        },
      },
    }) facultad: Omit<Facultad, 'id'>,
  ): Promise<Facultad> {
    return this.estudianteRepository.facultad(id).create(facultad);
  }

  @patch('/estudiantes/{id}/facultad', {
    responses: {
      '200': {
        description: 'Estudiante.Facultad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Facultad, {partial: true}),
        },
      },
    })
    facultad: Partial<Facultad>,
    @param.query.object('where', getWhereSchemaFor(Facultad)) where?: Where<Facultad>,
  ): Promise<Count> {
    return this.estudianteRepository.facultad(id).patch(facultad, where);
  }

  @del('/estudiantes/{id}/facultad', {
    responses: {
      '200': {
        description: 'Estudiante.Facultad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Facultad)) where?: Where<Facultad>,
  ): Promise<Count> {
    return this.estudianteRepository.facultad(id).delete(where);
  }
}

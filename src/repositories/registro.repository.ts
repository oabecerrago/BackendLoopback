import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Registro, RegistroRelations, Estudiante} from '../models';
import {EstudianteRepository} from './estudiante.repository';

export class RegistroRepository extends DefaultCrudRepository<
  Registro,
  typeof Registro.prototype.id,
  RegistroRelations
> {

  public readonly estudiantes: HasManyRepositoryFactory<Estudiante, typeof Registro.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Registro, dataSource);
    this.estudiantes = this.createHasManyRepositoryFactoryFor('estudiantes', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiantes', this.estudiantes.inclusionResolver);
  }
}

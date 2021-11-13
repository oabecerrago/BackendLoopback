import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Facultad, FacultadRelations, Estudiante, Profesor} from '../models';
import {EstudianteRepository} from './estudiante.repository';
import {ProfesorRepository} from './profesor.repository';

export class FacultadRepository extends DefaultCrudRepository<
  Facultad,
  typeof Facultad.prototype.id,
  FacultadRelations
> {

  public readonly estudiantes: HasManyRepositoryFactory<Estudiante, typeof Facultad.prototype.id>;

  public readonly profesors: HasManyRepositoryFactory<Profesor, typeof Facultad.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>, @repository.getter('ProfesorRepository') protected profesorRepositoryGetter: Getter<ProfesorRepository>,
  ) {
    super(Facultad, dataSource);
    this.profesors = this.createHasManyRepositoryFactoryFor('profesors', profesorRepositoryGetter,);
    this.registerInclusionResolver('profesors', this.profesors.inclusionResolver);
    this.estudiantes = this.createHasManyRepositoryFactoryFor('estudiantes', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiantes', this.estudiantes.inclusionResolver);
  }
}

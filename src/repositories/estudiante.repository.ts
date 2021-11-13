import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Estudiante, EstudianteRelations, Facultad, Registro} from '../models';
import {FacultadRepository} from './facultad.repository';
import {RegistroRepository} from './registro.repository';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.id,
  EstudianteRelations
> {

  public readonly facultad: HasOneRepositoryFactory<Facultad, typeof Estudiante.prototype.id>;

  public readonly registro: HasOneRepositoryFactory<Registro, typeof Estudiante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FacultadRepository') protected facultadRepositoryGetter: Getter<FacultadRepository>, @repository.getter('RegistroRepository') protected registroRepositoryGetter: Getter<RegistroRepository>,
  ) {
    super(Estudiante, dataSource);
    this.registro = this.createHasOneRepositoryFactoryFor('registro', registroRepositoryGetter);
    this.registerInclusionResolver('registro', this.registro.inclusionResolver);
    this.facultad = this.createHasOneRepositoryFactoryFor('facultad', facultadRepositoryGetter);
    this.registerInclusionResolver('facultad', this.facultad.inclusionResolver);
  }
}

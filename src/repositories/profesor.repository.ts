import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Profesor, ProfesorRelations, Registro} from '../models';
import {RegistroRepository} from './registro.repository';

export class ProfesorRepository extends DefaultCrudRepository<
  Profesor,
  typeof Profesor.prototype.id,
  ProfesorRelations
> {

  public readonly registro: HasOneRepositoryFactory<Registro, typeof Profesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RegistroRepository') protected registroRepositoryGetter: Getter<RegistroRepository>,
  ) {
    super(Profesor, dataSource);
    this.registro = this.createHasOneRepositoryFactoryFor('registro', registroRepositoryGetter);
    this.registerInclusionResolver('registro', this.registro.inclusionResolver);
  }
}

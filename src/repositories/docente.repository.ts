import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Docente, DocenteRelations, Salones} from '../models';
import {SalonesRepository} from './salones.repository';

export class DocenteRepository extends DefaultCrudRepository<
  Docente,
  typeof Docente.prototype.id,
  DocenteRelations
> {

  public readonly salones: HasManyRepositoryFactory<Salones, typeof Docente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SalonesRepository') protected salonesRepositoryGetter: Getter<SalonesRepository>,
  ) {
    super(Docente, dataSource);
    this.salones = this.createHasManyRepositoryFactoryFor('salones', salonesRepositoryGetter,);
    this.registerInclusionResolver('salones', this.salones.inclusionResolver);
  }
}

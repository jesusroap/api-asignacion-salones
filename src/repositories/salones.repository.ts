import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Salones, SalonesRelations, Docente, Salon} from '../models';
import {DocenteRepository} from './docente.repository';
import {SalonRepository} from './salon.repository';

export class SalonesRepository extends DefaultCrudRepository<
  Salones,
  typeof Salones.prototype.id,
  SalonesRelations
> {

  public readonly docente: BelongsToAccessor<Docente, typeof Salones.prototype.id>;

  public readonly salon: HasOneRepositoryFactory<Salon, typeof Salones.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DocenteRepository') protected docenteRepositoryGetter: Getter<DocenteRepository>, @repository.getter('SalonRepository') protected salonRepositoryGetter: Getter<SalonRepository>,
  ) {
    super(Salones, dataSource);
    this.salon = this.createHasOneRepositoryFactoryFor('salon', salonRepositoryGetter);
    this.registerInclusionResolver('salon', this.salon.inclusionResolver);
    this.docente = this.createBelongsToAccessorFor('docente', docenteRepositoryGetter,);
    this.registerInclusionResolver('docente', this.docente.inclusionResolver);
  }
}

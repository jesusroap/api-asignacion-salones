import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Salones,
  Docente,
} from '../models';
import {SalonesRepository} from '../repositories';

export class SalonesDocenteController {
  constructor(
    @repository(SalonesRepository)
    public salonesRepository: SalonesRepository,
  ) { }

  @get('/salones/{id}/docente', {
    responses: {
      '200': {
        description: 'Docente belonging to Salones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Docente)},
          },
        },
      },
    },
  })
  async getDocente(
    @param.path.string('id') id: typeof Salones.prototype.id,
  ): Promise<Docente> {
    return this.salonesRepository.docente(id);
  }
}

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
  Salones,
  Salon,
} from '../models';
import {SalonesRepository} from '../repositories';

export class SalonesSalonController {
  constructor(
    @repository(SalonesRepository) protected salonesRepository: SalonesRepository,
  ) { }

  @get('/salones/{id}/salon', {
    responses: {
      '200': {
        description: 'Salones has one Salon',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Salon),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Salon>,
  ): Promise<Salon> {
    return this.salonesRepository.salon(id).get(filter);
  }

  @post('/salones/{id}/salon', {
    responses: {
      '200': {
        description: 'Salones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Salon)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Salones.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {
            title: 'NewSalonInSalones',
            exclude: ['id'],
            optional: ['salonesId']
          }),
        },
      },
    }) salon: Omit<Salon, 'id'>,
  ): Promise<Salon> {
    return this.salonesRepository.salon(id).create(salon);
  }

  @patch('/salones/{id}/salon', {
    responses: {
      '200': {
        description: 'Salones.Salon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {partial: true}),
        },
      },
    })
    salon: Partial<Salon>,
    @param.query.object('where', getWhereSchemaFor(Salon)) where?: Where<Salon>,
  ): Promise<Count> {
    return this.salonesRepository.salon(id).patch(salon, where);
  }

  @del('/salones/{id}/salon', {
    responses: {
      '200': {
        description: 'Salones.Salon DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Salon)) where?: Where<Salon>,
  ): Promise<Count> {
    return this.salonesRepository.salon(id).delete(where);
  }
}

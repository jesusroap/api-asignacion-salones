import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Salon} from '../models';
import {SalonRepository} from '../repositories';

export class SalonController {
  constructor(
    @repository(SalonRepository)
    public salonRepository : SalonRepository,
  ) {}

  @post('/salons')
  @response(200, {
    description: 'Salon model instance',
    content: {'application/json': {schema: getModelSchemaRef(Salon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {
            title: 'NewSalon',
            exclude: ['id'],
          }),
        },
      },
    })
    salon: Omit<Salon, 'id'>,
  ): Promise<Salon> {
    return this.salonRepository.create(salon);
  }

  @get('/salons/count')
  @response(200, {
    description: 'Salon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Salon) where?: Where<Salon>,
  ): Promise<Count> {
    return this.salonRepository.count(where);
  }

  @get('/salons')
  @response(200, {
    description: 'Array of Salon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Salon, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Salon) filter?: Filter<Salon>,
  ): Promise<Salon[]> {
    return this.salonRepository.find(filter);
  }

  @patch('/salons')
  @response(200, {
    description: 'Salon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {partial: true}),
        },
      },
    })
    salon: Salon,
    @param.where(Salon) where?: Where<Salon>,
  ): Promise<Count> {
    return this.salonRepository.updateAll(salon, where);
  }

  @get('/salons/{id}')
  @response(200, {
    description: 'Salon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Salon, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Salon, {exclude: 'where'}) filter?: FilterExcludingWhere<Salon>
  ): Promise<Salon> {
    return this.salonRepository.findById(id, filter);
  }

  @patch('/salons/{id}')
  @response(204, {
    description: 'Salon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {partial: true}),
        },
      },
    })
    salon: Salon,
  ): Promise<void> {
    await this.salonRepository.updateById(id, salon);
  }

  @put('/salons/{id}')
  @response(204, {
    description: 'Salon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() salon: Salon,
  ): Promise<void> {
    await this.salonRepository.replaceById(id, salon);
  }

  @del('/salons/{id}')
  @response(204, {
    description: 'Salon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.salonRepository.deleteById(id);
  }
}

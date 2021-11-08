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
import {Salones} from '../models';
import {SalonesRepository} from '../repositories';

export class SalonesController {
  constructor(
    @repository(SalonesRepository)
    public salonesRepository : SalonesRepository,
  ) {}

  @post('/salones')
  @response(200, {
    description: 'Salones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Salones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salones, {
            title: 'NewSalones',
            exclude: ['id'],
          }),
        },
      },
    })
    salones: Omit<Salones, 'id'>,
  ): Promise<Salones> {
    return this.salonesRepository.create(salones);
  }

  @get('/salones/count')
  @response(200, {
    description: 'Salones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Salones) where?: Where<Salones>,
  ): Promise<Count> {
    return this.salonesRepository.count(where);
  }

  @get('/salones')
  @response(200, {
    description: 'Array of Salones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Salones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Salones) filter?: Filter<Salones>,
  ): Promise<Salones[]> {
    return this.salonesRepository.find(filter);
  }

  @patch('/salones')
  @response(200, {
    description: 'Salones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salones, {partial: true}),
        },
      },
    })
    salones: Salones,
    @param.where(Salones) where?: Where<Salones>,
  ): Promise<Count> {
    return this.salonesRepository.updateAll(salones, where);
  }

  @get('/salones/{id}')
  @response(200, {
    description: 'Salones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Salones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Salones, {exclude: 'where'}) filter?: FilterExcludingWhere<Salones>
  ): Promise<Salones> {
    return this.salonesRepository.findById(id, filter);
  }

  @patch('/salones/{id}')
  @response(204, {
    description: 'Salones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salones, {partial: true}),
        },
      },
    })
    salones: Salones,
  ): Promise<void> {
    await this.salonesRepository.updateById(id, salones);
  }

  @put('/salones/{id}')
  @response(204, {
    description: 'Salones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() salones: Salones,
  ): Promise<void> {
    await this.salonesRepository.replaceById(id, salones);
  }

  @del('/salones/{id}')
  @response(204, {
    description: 'Salones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.salonesRepository.deleteById(id);
  }
}

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
  Docente,
  Salones,
} from '../models';
import {DocenteRepository} from '../repositories';

export class DocenteSalonesController {
  constructor(
    @repository(DocenteRepository) protected docenteRepository: DocenteRepository,
  ) { }

  @get('/docentes/{id}/salones', {
    responses: {
      '200': {
        description: 'Array of Docente has many Salones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Salones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Salones>,
  ): Promise<Salones[]> {
    return this.docenteRepository.salones(id).find(filter);
  }

  @post('/docentes/{id}/salones', {
    responses: {
      '200': {
        description: 'Docente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Salones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Docente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salones, {
            title: 'NewSalonesInDocente',
            exclude: ['id'],
            optional: ['docenteId']
          }),
        },
      },
    }) salones: Omit<Salones, 'id'>,
  ): Promise<Salones> {
    return this.docenteRepository.salones(id).create(salones);
  }

  @patch('/docentes/{id}/salones', {
    responses: {
      '200': {
        description: 'Docente.Salones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salones, {partial: true}),
        },
      },
    })
    salones: Partial<Salones>,
    @param.query.object('where', getWhereSchemaFor(Salones)) where?: Where<Salones>,
  ): Promise<Count> {
    return this.docenteRepository.salones(id).patch(salones, where);
  }

  @del('/docentes/{id}/salones', {
    responses: {
      '200': {
        description: 'Docente.Salones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Salones)) where?: Where<Salones>,
  ): Promise<Count> {
    return this.docenteRepository.salones(id).delete(where);
  }
}

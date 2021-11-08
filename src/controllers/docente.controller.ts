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
import {Docente} from '../models';
import {DocenteRepository} from '../repositories';

export class DocenteController {
  constructor(
    @repository(DocenteRepository)
    public docenteRepository : DocenteRepository,
  ) {}

  @post('/docentes')
  @response(200, {
    description: 'Docente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Docente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docente, {
            title: 'NewDocente',
            exclude: ['id'],
          }),
        },
      },
    })
    docente: Omit<Docente, 'id'>,
  ): Promise<Docente> {
    return this.docenteRepository.create(docente);
  }

  @get('/docentes/count')
  @response(200, {
    description: 'Docente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Docente) where?: Where<Docente>,
  ): Promise<Count> {
    return this.docenteRepository.count(where);
  }

  @get('/docentes')
  @response(200, {
    description: 'Array of Docente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Docente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Docente) filter?: Filter<Docente>,
  ): Promise<Docente[]> {
    return this.docenteRepository.find(filter);
  }

  @patch('/docentes')
  @response(200, {
    description: 'Docente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docente, {partial: true}),
        },
      },
    })
    docente: Docente,
    @param.where(Docente) where?: Where<Docente>,
  ): Promise<Count> {
    return this.docenteRepository.updateAll(docente, where);
  }

  @get('/docentes/{id}')
  @response(200, {
    description: 'Docente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Docente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Docente, {exclude: 'where'}) filter?: FilterExcludingWhere<Docente>
  ): Promise<Docente> {
    return this.docenteRepository.findById(id, filter);
  }

  @patch('/docentes/{id}')
  @response(204, {
    description: 'Docente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Docente, {partial: true}),
        },
      },
    })
    docente: Docente,
  ): Promise<void> {
    await this.docenteRepository.updateById(id, docente);
  }

  @put('/docentes/{id}')
  @response(204, {
    description: 'Docente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() docente: Docente,
  ): Promise<void> {
    await this.docenteRepository.replaceById(id, docente);
  }

  @del('/docentes/{id}')
  @response(204, {
    description: 'Docente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.docenteRepository.deleteById(id);
  }
}

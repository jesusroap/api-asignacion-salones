import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Docente} from './docente.model';
import {Salon} from './salon.model';

@model()
export class Salones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_salon: string;

  @property({
    type: 'string',
    required: true,
  })
  horario: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => Docente)
  docenteId: string;

  @hasOne(() => Salon)
  salon: Salon;

  constructor(data?: Partial<Salones>) {
    super(data);
  }
}

export interface SalonesRelations {
  // describe navigational properties here
}

export type SalonesWithRelations = Salones & SalonesRelations;

import {Entity, model, property} from '@loopback/repository';

@model()
export class Salon extends Entity {
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
  numeroSalon: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  recursos: string[];

  @property({
    type: 'string',
  })
  salonesId?: string;

  constructor(data?: Partial<Salon>) {
    super(data);
  }
}

export interface SalonRelations {
  // describe navigational properties here
}

export type SalonWithRelations = Salon & SalonRelations;

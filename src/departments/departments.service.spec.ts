import { ConflictException, NotFoundException } from '@nestjs/common';
import { DepartmentsService } from './departments.service';

describe('DepartmentsService', () => {
  let service: DepartmentsService;

  beforeEach(() => {
    service = new DepartmentsService();
  });

  it('registers and lists departments', () => {
    expect(service.create({ name: ' Desarrollo ' })).toEqual({
      id: 1,
      name: 'Desarrollo',
    });
    expect(service.create({ name: 'Diseño' })).toEqual({ id: 2, name: 'Diseño' });
    expect(service.findAll()).toHaveLength(2);
  });

  it('does not allow duplicate names regardless of case', () => {
    service.create({ name: 'QA' });

    expect(() => service.create({ name: 'qa' })).toThrow(ConflictException);
  });

  it('updates and removes a department', () => {
    service.create({ name: 'Marketing' });

    expect(service.update(1, { name: 'Ventas' })).toEqual({
      id: 1,
      name: 'Ventas',
    });
    service.remove(1);

    expect(() => service.findOne(1)).toThrow(NotFoundException);
  });
});
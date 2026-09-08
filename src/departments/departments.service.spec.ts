import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let repository: Repository<Department>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: getRepositoryToken(Department),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    repository = module.get<Repository<Department>>(
      getRepositoryToken(Department),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates a department with trimmed name', async () => {
      mockRepository.find.mockResolvedValue([]);
      mockRepository.create.mockImplementation((dto) => dto);
      mockRepository.save.mockImplementation(async (dto) => ({
        id: 1,
        ...dto,
      }));

      const result = await service.create({
        nombre: ' Desarrollo ',
        descripcion: 'Area de desarrollo',
      });

      expect(result.nombre).toBe('Desarrollo');
      expect(result.descripcion).toBe('Area de desarrollo');
    });

    it('throws ConflictException for duplicate name', async () => {
      mockRepository.find.mockResolvedValue([
        { id: 1, nombre: 'QA', descripcion: 'Quality Assurance' },
      ]);

      await expect(
        service.create({ nombre: 'qa', descripcion: 'QA duplicado' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('throws NotFoundException when not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});

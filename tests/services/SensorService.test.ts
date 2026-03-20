import { vi, describe, it, expect, beforeEach } from 'vitest';

vi.resetModules();

const mockSensorRepository = {
  find: vi.fn(),
};

vi.mock('../../src/database/appDataSource.js', () => {
  return {
    appDataSource: {
      getRepository: () => mockSensorRepository,
    },
  };
});

import SensorService from '../../src/services/SensorService';
import { sensorMock } from '../mocks/sensors.mock';

describe('SensorService testes', () => {
  const service = new SensorService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Deve retornar todos os sensores', async () => {
    const sensorsMock = [sensorMock];

    mockSensorRepository.find.mockResolvedValue(sensorsMock);

    const result = await service.getAllSensors();

    expect(result).toEqual(sensorsMock);
  });
});

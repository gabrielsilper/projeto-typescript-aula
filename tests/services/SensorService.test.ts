import { vi, describe, it, expect, beforeEach } from "vitest";

vi.resetModules();

const mockSensorRepository = {
  find: vi.fn(),
  findOne: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
};

const mockAreaRepository = {
  findOne: vi.fn(),
};

vi.mock("../../src/database/appDataSource.js", () => {
  return {
    appDataSource: {
      getRepository: (entity: any) => {
        if (entity === Sensor) return mockSensorRepository;
        if (entity === Area) return mockAreaRepository;

        return {};
      },
    },
  };
});

import SensorService from "../../src/services/SensorService";
import {
  areaMock,
  sensorCreateDataMock,
  sensorMock,
} from "../mocks/sensors.mock";
import { Sensor } from "../../src/entities/Sensor";
import Area from "../../src/entities/Area";
import { AppError } from "../../src/errors/AppError";

describe("SensorService testes", () => {
  const service = new SensorService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Deve retornar todos os sensores", async () => {
    // Arrange
    const sensorsMock = [sensorMock];
    mockSensorRepository.find.mockResolvedValue(sensorsMock);

    // Act
    const result = await service.getAllSensors();

    // Assert
    expect(result).toEqual(sensorsMock);
  });

  it("Deve criar um sensor com sucesso", async () => {
    // Arrange
    mockSensorRepository.findOne.mockResolvedValue(null);
    mockAreaRepository.findOne.mockResolvedValue(areaMock);
    mockSensorRepository.create.mockResolvedValue(sensorMock);
    mockSensorRepository.save.mockResolvedValue(sensorMock);

    // Act
    const sensorCreated = await service.addSensor(sensorCreateDataMock);

    // Assert
    expect(sensorCreated).toHaveProperty("id");
    expect(sensorCreated.id).toBe(sensorMock.id);
    expect(sensorCreated).toEqual(sensorMock);
    expect(mockSensorRepository.findOne).toHaveBeenCalledOnce();
    expect(mockAreaRepository.findOne).toHaveBeenCalledOnce();
    expect(mockSensorRepository.create).toHaveBeenCalledOnce();
    expect(mockSensorRepository.save).toHaveBeenCalledOnce();
  });

  it("Deve lançar um erro ao criar um sensor com serialNumber que já existe", async () => {
    // Arrange
    mockSensorRepository.findOne.mockResolvedValue(sensorMock);

    // Act & Assert
    try {
      await service.addSensor({ serialNumber: "123", area_id: 1 });
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe(
        "Sensor com este Serial Number já cadastrado!",
      );

      expect(mockSensorRepository.findOne).toHaveBeenCalledOnce();
      expect(mockAreaRepository.findOne).not.toHaveBeenCalled();
      expect(mockSensorRepository.create).not.toHaveBeenCalled();
      expect(mockSensorRepository.save).not.toHaveBeenCalled();
    }
  });

  it("Deve lançar um erro ao criar um sensor com uma área que não foi cadastrada", async () => {
    // Arrange
    mockSensorRepository.findOne.mockResolvedValue(null);
    mockAreaRepository.findOne.mockResolvedValue(null);

    // Act & Assert
    try {
      await service.addSensor({ serialNumber: "123", area_id: 1 });
    } catch (error: any) {
      expect(error).toBeInstanceOf(AppError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe(
        "Area não foi encontrada!",
      );

      expect(mockSensorRepository.findOne).toHaveBeenCalledOnce();
      expect(mockAreaRepository.findOne).toHaveBeenCalledOnce();
      expect(mockSensorRepository.create).not.toHaveBeenCalled();
      expect(mockSensorRepository.save).not.toHaveBeenCalled();
    }
  });
});

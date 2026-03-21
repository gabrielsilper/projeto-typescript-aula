import Area from "../../src/entities/Area";
import { Sensor } from "../../src/entities/Sensor";

export const areaMock: Area = {
  id: "a6ec24dc-eb2b-4f9a-b98c-1e4d074e2589",
  nome: "Area X",
  bioma: "Bioma X",
  latitude: -3.065646,
  longitude: -60.064381,
  largura: 1000,
  comprimento: 450,
  sensores: [],
};

export const sensorMock: Sensor = {
  id: "2f19dfa2-ddbd-4f74-9b5f-fee3467e64bf",
  serialNumber: "00001",
  fabricante: "Fabricante X",
  modelo: "Modelo X",
  tipo: "Tipo X",
  status: "Ativo",
  dataInstalacao: new Date(1773978173000),
  cicloLeitura: 23,
  latitude: -3.065604,
  longitude: -60.064461,
  area: areaMock,
  leituras: [],
};

export const sensorCreateDataMock = {
  serialNumber: "00001",
  fabricante: "Fabricante X",
  modelo: "Modelo X",
  tipo: "Tipo X",
  status: "Ativo",
  dataInstalacao: new Date(1773978173000),
  cicloLeitura: 23,
  latitude: -3.065604,
  longitude: -60.064461,
  area: areaMock,
  leituras: [],
};

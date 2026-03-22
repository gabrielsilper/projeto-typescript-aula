import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "../../src/app";
import { testDataSource } from "../../src/database/testDataSource";
import { appDataSource } from "../../src/database/appDataSource";
import { bodyPesquisadorMock } from "../mocks/mocks";
import { string } from "zod";

describe("Testes de integração para contexto total das rotas de Pesquisador", () => {
  beforeAll(async () => {
    await testDataSource.initialize();
    Object.assign(appDataSource, testDataSource);
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  describe("Testes de criação de pesquisador", () => {
    it("Deve enviar uma requisição POST para /api/pesquisador, retornar um objeto pesquisador com código 201", async () => {
      const response = await request(app)
        .post("/api/pesquisador")
        .send(bodyPesquisadorMock);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id', expect.any(String))
      expect(response.body.senha).not.toBe(bodyPesquisadorMock.senha);
      expect(response.body.matricula).toBe(bodyPesquisadorMock.matricula);
      expect(response.body.email).toBe(bodyPesquisadorMock.email);
    });
  });
});

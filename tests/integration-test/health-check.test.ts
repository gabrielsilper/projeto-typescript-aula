import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../../src/app";

describe("Teste de Health Check da aplicação", () => {
  it("deve retornar 200", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
  });
});

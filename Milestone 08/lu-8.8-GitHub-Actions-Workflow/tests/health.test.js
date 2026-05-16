// tests/health.test.js
// Tests for the health check endpoint

const request = require("supertest");
const app = require("../src/server");

describe("Health Check API", () => {
  test("GET /api/health should return status ok", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("uptime");
  });

  test("GET / should return API info", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("TaskPulse API");
    expect(response.body.version).toBe("1.0.0");
  });

  test("GET /unknown should return 404", async () => {
    const response = await request(app).get("/unknown");

    expect(response.status).toBe(404);
  });
});

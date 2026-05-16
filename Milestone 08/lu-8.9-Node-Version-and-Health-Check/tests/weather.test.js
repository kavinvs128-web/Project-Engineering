// tests/weather.test.js
// Tests for the Weather API

const request = require("supertest");
const app = require("../src/server");

describe("Weather API", () => {
  
  test("GET /api/weather/forecast returns default order", async () => {
    const response = await request(app).get("/api/weather/forecast");
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
    expect(response.body[0].day).toBe("Monday"); // Unsorted
  });

  test("GET /api/weather/forecast?sort=temp returns sorted array", async () => {
    const response = await request(app).get("/api/weather/forecast?sort=temp");
    
    // ============================================================
    // If run on Node 18 (like the broken GitHub Actions workflow),
    // this test will FAIL because the endpoint throws a 500 error:
    // "TypeError: mockForecast.toSorted is not a function"
    //
    // The student develops locally on Node 20, where this passes.
    // ============================================================
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
    
    // Thursday is the hottest day (25C)
    expect(response.body[0].day).toBe("Thursday");
    expect(response.body[0].tempC).toBe(25);
  });
});

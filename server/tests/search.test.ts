import { enableFetchMocks } from "jest-fetch-mock";
enableFetchMocks();

import app from "../app";
import request from "supertest";

const endpoint = "/api/v1/search";

describe(`GET ${endpoint}`, () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Responds 200 to valid query", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ page: 1, results: [] }));
    const response = await request(app).get(`${endpoint}?query=Frozen`);

    // Sanity check to make sure mock is working
    expect(response.body).toStrictEqual({ page: 1, results: [] });
    expect(response.statusCode).toBe(200);
  });

  it("Responds with correct page", async ()=> {
    fetchMock.mockResponseOnce(JSON.stringify({ page: 1, results: [] }));
    const response = await request(app).get(`${endpoint}?query=Frozen&page=2`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ page: 2, results: [] });
  })

  it("Responds 400 to invalid queries", async () => {
    fetchMock.mockResponse(JSON.stringify({ page: 1, results: [] }));

    const response1 = await request(app).get(`${endpoint}?`);
    expect(response1.statusCode).toBe(400);
    
    const response2 = await request(app).get(`${endpoint}?query=`);
    expect(response2.statusCode).toBe(400);
    
    const response3 = await request(app).get(`${endpoint}?page=3`);
    expect(response3.statusCode).toBe(400);
  });
});

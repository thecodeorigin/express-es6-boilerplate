const request = require('supertest');
const server = require('../app');
const knex = require('../src/config/connection');

describe('/users endpoint', () => {
  test('GET /users should return 401 if user is not logged in', async (done) => {
    const response = await request(server).get('/v1/users');
    expect(response.statusCode).toBe(401);
    done();
  });
  test('GET /users/:id should return 401 if user is not logged in', async (done) => {
    const id = 1;
    const response = await request(server).get(`/v1/users/${id}`);
    expect(response.statusCode).toBe(401);
    done();
  });
  test('POST /users should return 401 if user is not logged in', async (done) => {
    const response = await request(server).post('/v1/users');
    expect(response.statusCode).toBe(401);
    done();
  });
  test('PATCH /users should return 401 if user is not logged in', async (done) => {
    const id = 1;
    const response = await request(server).patch(`/v1/users/${id}`);
    expect(response.statusCode).toBe(401);
    done();
  });
  test('DELETE /users should return 401 if user is not logged in', async (done) => {
    const id = 1;
    const response = await request(server).delete(`/v1/users/${id}`);
    expect(response.statusCode).toBe(401);
    done();
  });
  afterEach(() => {
    knex.destroy();
    server.close();
  });
});

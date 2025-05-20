const request = require('supertest');
const app = require('../server');

describe('POST /api/certificado', () => {
  test('returns PDF for valid payload', async () => {
    const payload = {
      empresa: { nombre: 'ACME', cif: 'A-123' },
      inversor: { nombre: 'John', nif: '12345678A' },
      inversion: { fecha: '2023-01-01', importe: 1000 }
    };

    const res = await request(app).post('/api/certificado').send(payload);
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/pdf/);
  });

  test('rejects invalid payload', async () => {
    const res = await request(app).post('/api/certificado').send({});
    expect(res.status).toBe(400);
  });
});

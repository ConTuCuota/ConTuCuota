const request = require('supertest');
const app = require('../server');

describe('POST /api/certificado', () => {
  test('returns PDF for valid input', async () => {
    const data = {
      empresa: { nombre: 'ACME', cif: 'A1' },
      inversor: { nombre: 'Investor', nif: 'N1' },
      inversion: { fecha: '2023-01-01', importe: 1000 }
    };

    const res = await request(app)
      .post('/api/certificado')
      .send(data);

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/pdf/);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('returns 400 for malformed JSON', async () => {
    const res = await request(app)
      .post('/api/certificado')
      .set('Content-Type', 'application/json')
      .send('{"badJson":');

    expect(res.status).toBe(400);
  });
});

const { calcularPayback, calcularVAN } = require('../simulador');

describe('calcularPayback', () => {
  test('returns fractional year when recovery occurs between periods', () => {
    const acumulados = [-1000, -400, 200];
    const payback = calcularPayback(acumulados);
    expect(payback).toBeCloseTo(2.6667, 4);
  });

  test('returns horizon length + 1 when never recovered', () => {
    const acumulados = [-500, -300, -100];
    const payback = calcularPayback(acumulados);
    expect(payback).toBe(acumulados.length + 1);
  });
});

describe('calcularVAN', () => {
  test('computes net present value for simple flows', () => {
    const van = calcularVAN([-1000, 600, 600], 0.1);
    expect(van).toBeCloseTo(37.5657, 4);
  });
});

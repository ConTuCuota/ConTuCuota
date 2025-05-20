const { calcularFlujosPrincipales, calcularTIR } = require('../simulador');

describe('calcularFlujosPrincipales', () => {
  test('generates expected flows for basic scenario', () => {
    const params = {
      tasaDeduccion: 0.5,
      tasaRecuperacionCapital: 0.5,
      inicioRecuperacion: 3
    };
    const result = calcularFlujosPrincipales(1000, 3, params);

    expect(result.aportacionBruta).toEqual([
      -1000, -1000, -1000,
      0, 0, 0,
      0, 0, 0,
      0
    ]);
    expect(result.deduccionFiscal).toEqual([
      0, 500, 500, 500, 0,
      0, 0, 0, 0, 0
    ]);
    expect(result.recuperacionCapital).toEqual([
      0, 0, 0, 500, 500,
      500, 0, 0, 0, 0
    ]);
    expect(result.flujoNetoAnual).toEqual([
      -1000, -500, -500,
      1000, 500, 500,
      0, 0, 0,
      0
    ]);
    expect(result.flujoAcumulado).toEqual([
      -1000, -1500, -2000,
      -1000, -500, 0,
      0, 0, 0,
      0
    ]);
    expect(result.capitalEnEmpresa).toEqual([
      1000, 2000, 3000,
      2500, 2000, 1500,
      1500, 1500, 1500,
      1500
    ]);
    expect(result.capitalRemanente).toBe(1500);
  });
});

describe('calcularTIR', () => {
  test('computes realistic rate for known case', () => {
    const tir = calcularTIR([-1000, 0, 0, 0, 2000]);
    expect(tir).toBeCloseTo(0.1892, 4);
  });
});

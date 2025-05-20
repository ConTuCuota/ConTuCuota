// Calcular los flujos financieros principales (aportaciones, deducciones y recuperaciones)
function calcularFlujosPrincipales(ticketAnual, aniosInversion, parametros) {
  // Inicializar arrays para los diferentes flujos (10 años)
  const flujos = {
    anios: Array.from({length: 10}, (_, i) => i + 1),
    aportacionBruta: Array(10).fill(0),
    deduccionFiscal: Array(10).fill(0),
    recuperacionCapital: Array(10).fill(0),
    flujoNetoAnual: Array(10).fill(0),
    flujoAcumulado: Array(10).fill(0),
    capitalEnEmpresa: Array(10).fill(0),
    capitalRemanente: 0
  };
  
  // 1. Calcular aportaciones brutas (lo que se aporta cada año)
  for (let i = 0; i < aniosInversion; i++) {
    flujos.aportacionBruta[i] = -ticketAnual;
  }
  
  // 2. Calcular deducciones fiscales (50% al año siguiente)
  for (let i = 0; i < aniosInversion; i++) {
    if (i + 1 < 10) {
      flujos.deduccionFiscal[i + 1] = Math.abs(flujos.aportacionBruta[i]) * parametros.tasaDeduccion;
    }
  }
  
  // 3. Calcular recuperaciones de capital (50% del capital aportado, a partir del año 4)
  for (let i = 0; i < aniosInversion; i++) {
    const anioRecuperacion = i + parametros.inicioRecuperacion;
    if (anioRecuperacion < 10) {
      // Recuperamos el 50% del capital aportado en el año i
      const capitalARecuperar = Math.abs(flujos.aportacionBruta[i]) * parametros.tasaRecuperacionCapital;
      flujos.recuperacionCapital[anioRecuperacion] = capitalARecuperar;
    }
  }
  
  // 4. Calcular capital acumulado en la empresa año a año
  let capitalAcumulado = 0;
  for (let i = 0; i < 10; i++) {
    // Sumamos la aportación bruta de este año (si es negativa, aumenta el capital)
    if (i < aniosInversion) {
      capitalAcumulado += Math.abs(flujos.aportacionBruta[i]);
    }
    
    // Restamos las recuperaciones de capital que ocurren este año
    capitalAcumulado -= flujos.recuperacionCapital[i];
    
    // Guardamos el capital acumulado en la empresa al final de este año
    flujos.capitalEnEmpresa[i] = capitalAcumulado;
  }
  
  // 5. Calcular flujo neto anual (suma de todos los flujos de cada año)
  for (let i = 0; i < 10; i++) {
    flujos.flujoNetoAnual[i] = 
      flujos.aportacionBruta[i] + 
      flujos.deduccionFiscal[i] + 
      flujos.recuperacionCapital[i];
  }
  
  // 6. Calcular flujo acumulado
  let acumulado = 0;
  for (let i = 0; i < 10; i++) {
    acumulado += flujos.flujoNetoAnual[i];
    flujos.flujoAcumulado[i] = acumulado;
  }
  
  // 7. Calcular capital remanente al final del período
  // El capital remanente es exactamente el 50% del capital total invertido
  // ya que el otro 50% se recupera mediante la recompra pactada
  const inversionTotal = aniosInversion * ticketAnual;
  const recuperacionTotal = flujos.recuperacionCapital.reduce((sum, val) => sum + val, 0);
  
  // Verificamos que la recuperación sea exactamente el 50% de la inversión total.
  // Si no coincide, solo registramos una advertencia en consola.
  if (Math.abs(recuperacionTotal - (inversionTotal * 0.5)) > 0.01) {
    console.warn("Inconsistencia detectada en la recuperación de capital");
    // No ajustamos la recuperación, solo verificamos
  }
  
  // El capital remanente debe ser exactamente el 50% de la inversión total
  flujos.capitalRemanente = inversionTotal * 0.5;
  
  // Aseguramos que el capital en empresa al final refleje correctamente el capital remanente
  flujos.capitalEnEmpresa[9] = flujos.capitalRemanente;
  
  return flujos;
function calcularTIR(flujos) {
  // Implementación simplificada de TIR usando método de Newton-Raphson
  let tir = 0.1; // Valor inicial
  const maxIteraciones = 100;
  const precision = 0.0001;
  
  for (let i = 0; i < maxIteraciones; i++) {
    let f = 0;
    let df = 0;
    
    for (let j = 0; j < flujos.length; j++) {
      f += flujos[j] / Math.pow(1 + tir, j);
      df += -j * flujos[j] / Math.pow(1 + tir, j + 1);
    }
    
    // Evitar división por cero si la derivada es demasiado pequeña
    if (Math.abs(df) < 1e-8) {
      break;
    }
    // Actualizar TIR
    const nuevoTir = tir - f / df;
    
    // Verificar convergencia
    if (Math.abs(nuevoTir - tir) < precision) {
      return nuevoTir;
    }
    
    tir = nuevoTir;
  }
  
  return tir;
}

export { calcularFlujosPrincipales, calcularTIR };

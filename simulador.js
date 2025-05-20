/**
 * Simulador Financiero Mejorado para ConTuCuota
 * 
 * Este simulador implementa el modelo financiero para la inversión en ConTuCuota,
 * considerando:
 * - Aportaciones anuales desde el año 1 al año 5 (configurable)
 * - Deducción fiscal del 50% al año siguiente de cada aportación
 * - Recuperación del 50% del capital aportado a partir del final del año 4
 * - Módulo específico para simular diferentes escenarios para el capital remanente
 */

// Variables globales para mantener estado
let flujosPrincipales = null;
let escenarioRemanente = {
  tipo: 'recompra',
  tasaRecompra: 0.08,
  tasaDividendos: 0.05,
  tasaPerdida: 0.30,
  anioRealizacion: 8
};

// Función principal del simulador básico
function simularInversionBasica() {
  // Obtener parámetros de entrada
  const ticketAnual = parseInt(document.getElementById('sim-ticket').value);
  const aniosInversion = parseInt(document.getElementById('sim-anios').value);
  
  // Validar entradas
  if (isNaN(ticketAnual) || isNaN(aniosInversion) || aniosInversion < 1 || aniosInversion > 5) {
    alert('Por favor, introduce valores válidos.');
    return;
  }
  
  // Configurar parámetros base
  const parametrosBase = {
    tasaDeduccion: 0.5,                // 50% de deducción fiscal
    tasaRecuperacionCapital: 0.5,      // 50% de recuperación del capital
    inicioRecuperacion: 4,             // Año de inicio de recuperación (año 4)
    duracionRecuperacion: 1,           // Duración de la recuperación (1 año)
    tasaDescuento: 0.03,               // Tasa de descuento para VAN (3%)
    inflacionAnual: 0.02               // Inflación anual estimada (2%)
  };
  
  // Calcular flujos de caja para 10 años
  flujosPrincipales = calcularFlujosPrincipales(ticketAnual, aniosInversion, parametrosBase);
  
  // Actualizar visualizaciones básicas
  actualizarTablaFlujosPrincipales(flujosPrincipales);
  actualizarGraficoFlujosPrincipales(flujosPrincipales);
  actualizarResumenBasico(flujosPrincipales, ticketAnual, aniosInversion);
  
  // Activar y actualizar el módulo de escenarios para capital remanente
  document.getElementById('modulo-escenarios').classList.remove('hidden');
  actualizarModuloEscenarios(flujosPrincipales);
}

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
}

// Actualizar la tabla de flujos principales
function actualizarTablaFlujosPrincipales(flujos) {
  const tbody = document.querySelector('#tablaFlujosPrincipales tbody');
  tbody.innerHTML = '';
  
  for (let i = 0; i < 10; i++) {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
      <td>Año ${flujos.anios[i]}</td>
      <td>${flujos.aportacionBruta[i] !== 0 ? flujos.aportacionBruta[i].toLocaleString('es-ES') + ' €' : '-'}</td>
      <td>${flujos.deduccionFiscal[i] !== 0 ? flujos.deduccionFiscal[i].toLocaleString('es-ES') + ' €' : '-'}</td>
      <td>${flujos.recuperacionCapital[i] !== 0 ? flujos.recuperacionCapital[i].toLocaleString('es-ES') + ' €' : '-'}</td>
      <td>${flujos.flujoNetoAnual[i].toLocaleString('es-ES')} €</td>
      <td>${flujos.flujoAcumulado[i].toLocaleString('es-ES')} €</td>
      <td>${flujos.capitalEnEmpresa[i].toLocaleString('es-ES')} €</td>
    `;
    tbody.appendChild(tr);
  }
}

// Actualizar el gráfico con los datos calculados
function actualizarGraficoFlujosPrincipales(flujos) {
  const ctx = document.getElementById('graficoFlujoPrincipal').getContext('2d');
  
  // Destruir gráfico anterior si existe
  if (window.flujoPrincipalChart) {
    window.flujoPrincipalChart.destroy();
  }
  
  // Preparar datasets para el gráfico
  const datasets = [
    {
      label: 'Aportación (€)',
      data: flujos.aportacionBruta,
      backgroundColor: '#f44336',
      borderColor: '#d32f2f',
      borderWidth: 1
    },
    {
      label: 'Deducción IRPF (€)',
      data: flujos.deduccionFiscal,
      backgroundColor: '#4CAF50',
      borderColor: '#388E3C',
      borderWidth: 1
    },
    {
      label: 'Recuperación capital (€)',
      data: flujos.recuperacionCapital,
      backgroundColor: '#2196F3',
      borderColor: '#1976D2',
      borderWidth: 1
    }
  ];
  
  // Añadir línea de capital en empresa
  datasets.push({
    label: 'Capital en empresa (€)',
    data: flujos.capitalEnEmpresa,
    type: 'line',
    borderColor: '#E91E63',
    borderWidth: 3,
    fill: false,
    pointBackgroundColor: '#E91E63',
    pointRadius: 4,
    tension: 0.1,
    borderDash: [5, 5],
    yAxisID: 'y1',
    order: 1
  });
  
  // Crear el gráfico
  window.flujoPrincipalChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: flujos.anios.map(anio => `Año ${anio}`),
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Año'
          }
        },
        y: {
          stacked: true,
          position: 'left',
          title: {
            display: true,
            text: 'Flujo de caja (€)'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y1: {
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          title: {
            display: true,
            text: 'Capital en empresa (€)'
          },
          ticks: {
            color: '#E91E63'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
              }
              return label;
            }
          }
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Actualizar resumen básico
function actualizarResumenBasico(flujos, ticketAnual, aniosInversion) {
  const inversionTotal = flujos.aportacionBruta.reduce((sum, val) => sum + Math.abs(val), 0);
  const deduccionTotal = flujos.deduccionFiscal.reduce((sum, val) => sum + val, 0);
  const recuperacionTotal = flujos.recuperacionCapital.reduce((sum, val) => sum + val, 0);
  const capitalRemanente = flujos.capitalRemanente;
  
  document.getElementById('resumen-inversion-total').textContent = inversionTotal.toLocaleString('es-ES') + ' €';
  document.getElementById('resumen-deduccion-total').textContent = deduccionTotal.toLocaleString('es-ES') + ' €';
  document.getElementById('resumen-recuperacion-total').textContent = recuperacionTotal.toLocaleString('es-ES') + ' €';
  document.getElementById('resumen-capital-remanente').textContent = capitalRemanente.toLocaleString('es-ES') + ' €';
  
  // Actualizar texto de resumen
  const resumenTexto = `
    Con una inversión total de ${inversionTotal.toLocaleString('es-ES')} €, 
    recuperas ${deduccionTotal.toLocaleString('es-ES')} € en deducciones fiscales y 
    ${recuperacionTotal.toLocaleString('es-ES')} € en devoluciones de capital, 
    manteniendo ${capitalRemanente.toLocaleString('es-ES')} € como capital remanente en las empresas.
  `;
  
  document.getElementById('resumen-texto').textContent = resumenTexto;
}

// Actualizar el módulo de escenarios para capital remanente
function actualizarModuloEscenarios(flujosPrincipales) {
  // Actualizar el valor del capital remanente en la interfaz
  const capitalRemanente = flujosPrincipales.capitalRemanente;
  document.getElementById('capital-remanente-valor').textContent = capitalRemanente.toLocaleString('es-ES') + ' €';
  
  // Actualizar escenario seleccionado
  document.getElementById('escenario-tipo').value = escenarioRemanente.tipo;
  
  // Mostrar controles según el tipo de escenario
  actualizarControlesEscenario(escenarioRemanente.tipo);
  
  // Actualizar valores en controles
  document.getElementById('escenario-tasa-recompra').value = escenarioRemanente.tasaRecompra * 100;
  document.getElementById('escenario-tasa-dividendos').value = escenarioRemanente.tasaDividendos * 100;
  document.getElementById('escenario-tasa-perdida').value = escenarioRemanente.tasaPerdida * 100;
  document.getElementById('escenario-anio-realizacion').value = escenarioRemanente.anioRealizacion;
  
  // Calcular y mostrar resultados del escenario
  calcularResultadosEscenario();
}

// Actualizar controles según el tipo de escenario seleccionado
function actualizarControlesEscenario(tipo) {
  // Ocultar todos los controles específicos
  document.querySelectorAll('.control-escenario').forEach(el => {
    el.classList.add('hidden');
  });
  
  // Mostrar controles según el tipo seleccionado
  switch(tipo) {
    case 'recompra':
      document.getElementById('control-tasa-recompra').classList.remove('hidden');
      document.getElementById('control-anio-realizacion').classList.remove('hidden');
      break;
    case 'dividendos':
      document.getElementById('control-tasa-dividendos').classList.remove('hidden');
      break;
    case 'mixto':
      document.getElementById('control-tasa-recompra').classList.remove('hidden');
      document.getElementById('control-tasa-dividendos').classList.remove('hidden');
      document.getElementById('control-anio-realizacion').classList.remove('hidden');
      break;
    case 'perdida':
      document.getElementById('control-tasa-perdida').classList.remove('hidden');
      document.getElementById('control-anio-realizacion').classList.remove('hidden');
      break;
  }
}

// Cambiar tipo de escenario
function cambiarTipoEscenario() {
  const tipo = document.getElementById('escenario-tipo').value;
  escenarioRemanente.tipo = tipo;
  actualizarControlesEscenario(tipo);
  calcularResultadosEscenario();
}

// Actualizar parámetros del escenario desde controles
function actualizarParametrosEscenario() {
  escenarioRemanente.tasaRecompra = parseFloat(document.getElementById('escenario-tasa-recompra').value) / 100;
  escenarioRemanente.tasaDividendos = parseFloat(document.getElementById('escenario-tasa-dividendos').value) / 100;
  escenarioRemanente.tasaPerdida = parseFloat(document.getElementById('escenario-tasa-perdida').value) / 100;
  escenarioRemanente.anioRealizacion = parseInt(document.getElementById('escenario-anio-realizacion').value);
  
  calcularResultadosEscenario();
}

// Calcular resultados del escenario seleccionado
function calcularResultadosEscenario() {
  if (!flujosPrincipales) return;
  
  const capitalRemanente = flujosPrincipales.capitalRemanente;
  let resultadoCapital = 0;
  let flujoAnual = 0;
  let descripcion = '';
  
  switch(escenarioRemanente.tipo) {
    case 'recompra':
      resultadoCapital = capitalRemanente * (1 + escenarioRemanente.tasaRecompra);
      descripcion = `Recompra del capital remanente en el año ${escenarioRemanente.anioRealizacion} con una rentabilidad del ${(escenarioRemanente.tasaRecompra * 100).toFixed(1)}%`;
      break;
    case 'dividendos':
      flujoAnual = capitalRemanente * escenarioRemanente.tasaDividendos;
      descripcion = `Dividendos anuales del ${(escenarioRemanente.tasaDividendos * 100).toFixed(1)}% sobre el capital remanente`;
      break;
    case 'mixto':
      flujoAnual = capitalRemanente * escenarioRemanente.tasaDividendos;
      resultadoCapital = capitalRemanente * (1 + escenarioRemanente.tasaRecompra);
      descripcion = `Dividendos anuales del ${(escenarioRemanente.tasaDividendos * 100).toFixed(1)}% y recompra en el año ${escenarioRemanente.anioRealizacion} con rentabilidad del ${(escenarioRemanente.tasaRecompra * 100).toFixed(1)}%`;
      break;
    case 'perdida':
      resultadoCapital = capitalRemanente * (1 - escenarioRemanente.tasaPerdida);
      descripcion = `Pérdida patrimonial del ${(escenarioRemanente.tasaPerdida * 100).toFixed(1)}% sobre el capital remanente en el año ${escenarioRemanente.anioRealizacion}`;
      break;
  }
  
  // Actualizar resultados en la interfaz
  document.getElementById('escenario-resultado-capital').textContent = resultadoCapital.toLocaleString('es-ES') + ' €';
  document.getElementById('escenario-flujo-anual').textContent = flujoAnual.toLocaleString('es-ES') + ' €';
  document.getElementById('escenario-descripcion').textContent = descripcion;
  
  // Calcular y actualizar métricas financieras
  calcularMetricasFinancieras(flujosPrincipales, escenarioRemanente);
}

// Calcular métricas financieras combinando flujos principales y escenario de capital remanente
function calcularMetricasFinancieras(flujosPrincipales, escenarioRemanente) {
  // Crear una copia de los flujos principales para no modificarlos
  const flujosCombinados = JSON.parse(JSON.stringify(flujosPrincipales));
  
  // Añadir los flujos del escenario de capital remanente
  const capitalRemanente = flujosPrincipales.capitalRemanente;
  
  // Inicializar arrays para los flujos adicionales si no existen
  if (!flujosCombinados.dividendos) flujosCombinados.dividendos = Array(10).fill(0);
  if (!flujosCombinados.recompra) flujosCombinados.recompra = Array(10).fill(0);
  if (!flujosCombinados.perdida) flujosCombinados.perdida = Array(10).fill(0);
  
  // Aplicar escenario según tipo
  switch(escenarioRemanente.tipo) {
    case 'recompra':
      // Verificar que el año de realización está dentro del rango
      const anioRecompra = Math.min(escenarioRemanente.anioRealizacion - 1, 9);
      flujosCombinados.recompra[anioRecompra] = capitalRemanente * (1 + escenarioRemanente.tasaRecompra);
      break;
    case 'dividendos':
      // Aplicar dividendos desde el año 5 hasta el final
      for (let i = 4; i < 10; i++) {
        flujosCombinados.dividendos[i] = capitalRemanente * escenarioRemanente.tasaDividendos;
      }
      break;
    case 'mixto':
      // Aplicar dividendos desde el año 5 hasta la recompra
      const anioMixto = Math.min(escenarioRemanente.anioRealizacion - 1, 9);
      for (let i = 4; i < anioMixto; i++) {
        flujosCombinados.dividendos[i] = capitalRemanente * escenarioRemanente.tasaDividendos;
      }
      // Aplicar recompra en el año especificado
      flujosCombinados.recompra[anioMixto] = capitalRemanente * (1 + escenarioRemanente.tasaRecompra);
      break;
    case 'perdida':
      // Aplicar pérdida en el año especificado
      const anioPerdida = Math.min(escenarioRemanente.anioRealizacion - 1, 9);
      flujosCombinados.perdida[anioPerdida] = -capitalRemanente * escenarioRemanente.tasaPerdida;
      break;
  }
  
  // Recalcular flujo neto anual incluyendo los nuevos flujos
  for (let i = 0; i < 10; i++) {
    flujosCombinados.flujoNetoAnual[i] = 
      flujosCombinados.aportacionBruta[i] + 
      flujosCombinados.deduccionFiscal[i] + 
      flujosCombinados.recuperacionCapital[i] + 
      flujosCombinados.dividendos[i] + 
      flujosCombinados.recompra[i] + 
      flujosCombinados.perdida[i];
  }
  
  // Recalcular flujo acumulado
  let acumulado = 0;
  for (let i = 0; i < 10; i++) {
    acumulado += flujosCombinados.flujoNetoAnual[i];
    flujosCombinados.flujoAcumulado[i] = acumulado;
  }
  
  // Calcular métricas financieras
  const inversionTotal = flujosCombinados.aportacionBruta.reduce((sum, val) => sum + Math.abs(val), 0);
  const inversionNeta = inversionTotal - flujosCombinados.deduccionFiscal.reduce((sum, val) => sum + val, 0);
  const retornoTotal = flujosCombinados.recuperacionCapital.reduce((sum, val) => sum + val, 0) + 
                      flujosCombinados.dividendos.reduce((sum, val) => sum + val, 0) + 
                      flujosCombinados.recompra.reduce((sum, val) => sum + val, 0) + 
                      flujosCombinados.perdida.reduce((sum, val) => sum + val, 0);
  
  // ROI sobre inversión bruta
  const roiBruto = ((retornoTotal + flujosCombinados.deduccionFiscal.reduce((sum, val) => sum + val, 0)) / inversionTotal - 1) * 100;
  
  // ROI sobre inversión neta
  const roiNeto = (retornoTotal / inversionNeta - 1) * 100;
  
  // TIR
  const tir = calcularTIR(flujosCombinados.flujoNetoAnual);
  
  // Payback
  const payback = calcularPayback(flujosCombinados.flujoAcumulado);
  
  // VAN con tasa de descuento del 3%
  const van = calcularVAN(flujosCombinados.flujoNetoAnual, 0.03);
  
  // Múltiplo sobre inversión bruta
  const multiploBruto = (retornoTotal + flujosCombinados.deduccionFiscal.reduce((sum, val) => sum + val, 0)) / inversionTotal;
  
  // Múltiplo sobre inversión neta
  const multiploNeto = retornoTotal / inversionNeta;
  
  // Rentabilidad anualizada (CAGR)
  const cagr = Math.pow(multiploNeto, 1/10) - 1;
  
  // Actualizar métricas en la interfaz
  document.getElementById('metrica-roi').textContent = roiBruto.toFixed(2) + '%';
  document.getElementById('metrica-tir').textContent = (tir * 100).toFixed(2) + '%';
  document.getElementById('metrica-payback').textContent = payback.toFixed(1) + ' años';
  document.getElementById('metrica-van').textContent = van.toLocaleString('es-ES') + ' €';
  document.getElementById('metrica-multiplo').textContent = multiploBruto.toFixed(2) + 'x';
  document.getElementById('metrica-rentabilidad').textContent = (cagr * 100).toFixed(2) + '%';
  
  // Actualizar gráfico combinado
  actualizarGraficoCombinado(flujosCombinados);
}

// Actualizar gráfico combinado con todos los flujos
function actualizarGraficoCombinado(flujosCombinados) {
  const ctx = document.getElementById('graficoFlujoCombinado').getContext('2d');
  
  // Destruir gráfico anterior si existe
  if (window.flujoCombinadoChart) {
    window.flujoCombinadoChart.destroy();
  }
  
  // Preparar datasets para el gráfico
  const datasets = [
    {
      label: 'Aportación (€)',
      data: flujosCombinados.aportacionBruta,
      backgroundColor: '#f44336',
      borderColor: '#d32f2f',
      borderWidth: 1
    },
    {
      label: 'Deducción IRPF (€)',
      data: flujosCombinados.deduccionFiscal,
      backgroundColor: '#4CAF50',
      borderColor: '#388E3C',
      borderWidth: 1
    },
    {
      label: 'Recuperación capital (€)',
      data: flujosCombinados.recuperacionCapital,
      backgroundColor: '#2196F3',
      borderColor: '#1976D2',
      borderWidth: 1
    }
  ];
  
  // Añadir dividendos si existen
  if (flujosCombinados.dividendos.some(val => val !== 0)) {
    datasets.push({
      label: 'Dividendos (€)',
      data: flujosCombinados.dividendos,
      backgroundColor: '#9C27B0',
      borderColor: '#7B1FA2',
      borderWidth: 1
    });
  }
  
  // Añadir recompra si existe
  if (flujosCombinados.recompra.some(val => val !== 0)) {
    datasets.push({
      label: 'Recompra (€)',
      data: flujosCombinados.recompra,
      backgroundColor: '#FF9800',
      borderColor: '#F57C00',
      borderWidth: 1
    });
  }
  
  // Añadir pérdida si existe
  if (flujosCombinados.perdida.some(val => val !== 0)) {
    datasets.push({
      label: 'Pérdida (€)',
      data: flujosCombinados.perdida,
      backgroundColor: '#795548',
      borderColor: '#5D4037',
      borderWidth: 1
    });
  }
  
  // Añadir línea de flujo acumulado
  datasets.push({
    label: 'Flujo acumulado (€)',
    data: flujosCombinados.flujoAcumulado,
    type: 'line',
    borderColor: '#000000',
    borderWidth: 3,
    fill: false,
    pointBackgroundColor: '#000000',
    pointRadius: 4,
    tension: 0.1,
    yAxisID: 'y1',
    order: 0, // Asegura que se dibuje por encima de las barras
    z: 10 // Mayor prioridad visual
  });
  
  // Crear el gráfico
  window.flujoCombinadoChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: flujosCombinados.anios.map(anio => `Año ${anio}`),
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
          title: {
            display: true,
            text: 'Año'
          }
        },
        y: {
          stacked: true,
          position: 'left',
          title: {
            display: true,
            text: 'Flujo de caja (€)'
          }
        },
        y1: {
          position: 'right',
          grid: {
            drawOnChartArea: false
          },
          title: {
            display: true,
            text: 'Flujo acumulado (€)'
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
              }
              return label;
            }
          }
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// Funciones auxiliares para cálculos financieros

// Calcular TIR (Tasa Interna de Retorno)
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

// Calcular Payback (tiempo de recuperación)
function calcularPayback(flujosAcumulados) {
  // Buscar el primer año en que el flujo acumulado es positivo
  for (let i = 0; i < flujosAcumulados.length; i++) {
    if (flujosAcumulados[i] >= 0) {
      // Si es el primer año, devolver el año exacto
      if (i === 0 || flujosAcumulados[i-1] >= 0) {
        return i + 1;
      }
      
      // Interpolar para obtener el payback exacto
      const fraccion = Math.abs(flujosAcumulados[i-1]) / (flujosAcumulados[i] - flujosAcumulados[i-1]);
      return i + fraccion;
    }
  }
  
  // Si no se recupera en el horizonte, devolver un valor mayor
  return flujosAcumulados.length + 1;
}

// Calcular VAN (Valor Actual Neto)
function calcularVAN(flujos, tasaDescuento) {
  let van = 0;
  
  for (let i = 0; i < flujos.length; i++) {
    van += flujos[i] / Math.pow(1 + tasaDescuento, i);
  }
  
  return van;
}

// Funciones para cambiar entre pestañas
function cambiarTab(tabId) {
  // Desactivar todas las pestañas
  document.querySelectorAll('.tab-button').forEach(button => {
    button.classList.remove('active');
    button.setAttribute('aria-pressed', 'false');
  });
  
  // Ocultar todos los contenidos
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Activar la pestaña seleccionada
  document.querySelector(`.tab-button[onclick="cambiarTab('${tabId}')"]`).classList.add('active');
  document.querySelector(`.tab-button[onclick="cambiarTab('${tabId}')"]`).setAttribute('aria-pressed', 'true');
  document.getElementById(`tab-${tabId}`).classList.add('active');
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
  // Configurar eventos para controles de escenarios
  document.getElementById('escenario-tipo').addEventListener('change', cambiarTipoEscenario);
  document.getElementById('escenario-tasa-recompra').addEventListener('input', actualizarParametrosEscenario);
  document.getElementById('escenario-tasa-dividendos').addEventListener('input', actualizarParametrosEscenario);
  document.getElementById('escenario-tasa-perdida').addEventListener('input', actualizarParametrosEscenario);
  document.getElementById('escenario-anio-realizacion').addEventListener('change', actualizarParametrosEscenario);
  
  // Simular inversión inicial
  simularInversionBasica();
});

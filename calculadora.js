// Funciones para la calculadora de deducción IRPF
document.addEventListener('DOMContentLoaded', function() {
  // Gestión del formulario de calculadora
  const formCalculadora = document.getElementById('formCalculadora');
  if (formCalculadora) {
    formCalculadora.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const cuota = parseFloat(document.getElementById('cuota').value);
      const ticket = parseFloat(document.getElementById('ticket').value);
      const anios = parseInt(document.getElementById('anios').value);
      
      if (isNaN(cuota) || cuota <= 0) {
        alert('Por favor, introduce una cuota íntegra válida.');
        return;
      }
      
      // Cálculo correcto de la deducción según normativa
      // La deducción es el 50% del capital invertido, limitada por la cuota íntegra estatal
      const deduccionPotencial = ticket * 0.5; // 50% del capital invertido
      const deduccionTotal = deduccionPotencial * anios; // Total en todos los años
      const deduccionReal = Math.min(deduccionTotal, cuota); // Limitada por la cuota íntegra disponible
      
      // Calcular el porcentaje real de ahorro sobre el capital invertido
      const ahorroFiscalPorcentaje = (deduccionReal / (ticket * anios) * 100).toFixed(2);
      
      const resultadoDiv = document.getElementById('resultadoIRPF');
      // Aseguramos que el div de resultado sea visible
      resultadoDiv.style.display = 'block';
      resultadoDiv.innerHTML = `
        <h3>Resultado de tu deducción</h3>
        <p>Con una cuota íntegra estatal de <strong>${cuota.toLocaleString('es-ES')} €</strong> y una inversión de <strong>${ticket.toLocaleString('es-ES')} €</strong> durante <strong>${anios} ${anios === 1 ? 'año' : 'años'}</strong>:</p>
        <div class="resultado-detalle">
          <p>Deducción potencial: <strong>${deduccionTotal.toLocaleString('es-ES')} €</strong></p>
          <p>Deducción aplicable: <strong>${deduccionReal.toLocaleString('es-ES')} €</strong> ${deduccionReal < deduccionTotal ? '(limitada por la cuota íntegra disponible)' : ''}</p>
          <p>Ahorro fiscal: <strong>${ahorroFiscalPorcentaje}%</strong> sobre el capital invertido</p>
        </div>
        <p class="resultado-nota">Para un análisis más detallado, utiliza nuestro <a href="simulador.html">simulador completo</a>.</p>
      `;
      
      // Scroll hasta el resultado
      resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  
  // Gestión del formulario de contacto
  const formContacto = document.getElementById('formContacto');
  if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Gracias por tu mensaje. Te responderemos lo antes posible.');
      formContacto.reset();
    });
  }
});

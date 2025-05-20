// Asegurar que el JavaScript de certificados funcione correctamente
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }
  
  // Inicializar fecha actual para el campo de fecha de emisión
  const hoy = new Date();
  const fechaFormateada = hoy.toISOString().split('T')[0];
  const fechaEmisionInput = document.getElementById('certificado-fecha');
  if (fechaEmisionInput) {
    fechaEmisionInput.value = fechaFormateada;
  }
  
  // Configurar listeners para las FAQs
  setupFaqListeners();
  
  // Verificar si estamos en la página de certificados
  if (document.querySelector('.certificate-wizard')) {
    console.log('Inicializando herramienta de certificados...');
    initCertificateWizard();
  }
});

// Configurar listeners para las FAQs
function setupFaqListeners() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('active');
        const toggle = question.querySelector('.faq-toggle');
        if (toggle) {
          toggle.textContent = item.classList.contains('active') ? '-' : '+';
        }
      });
    }
  });
}

// Inicializar el asistente de certificados
function initCertificateWizard() {
  // Variables globales
  window.certificadoData = {
    empresa: {},
    inversor: {},
    inversion: {},
    verificacion: {},
    generacion: {}
  };
  
  // Asegurar que los botones de navegación tengan sus event listeners
  const nextButtons = document.querySelectorAll('.next-button');
  nextButtons.forEach(button => {
    const currentStep = parseInt(button.getAttribute('onclick').match(/\d+/)[0]);
    button.onclick = function() {
      return nextStep(currentStep);
    };
  });
  
  const prevButtons = document.querySelectorAll('.prev-button');
  prevButtons.forEach(button => {
    const currentStep = parseInt(button.getAttribute('onclick').match(/\d+/)[0]);
    button.onclick = function() {
      return prevStep(currentStep);
    };
  });
  
  // Asegurar que el botón de generación tenga su event listener
  const generateButton = document.querySelector('.generate-button');
  if (generateButton) {
    generateButton.onclick = generarCertificado;
  }
  
  console.log('Asistente de certificados inicializado correctamente');
}

// Función para avanzar al siguiente paso
function nextStep(currentStep) {
  console.log('Avanzando al paso', currentStep + 1);
  
  // Validar el paso actual antes de avanzar
  if (!validateStep(currentStep)) {
    return false;
  }
  
  // Guardar datos del paso actual
  saveStepData(currentStep);
  
  // Ocultar paso actual y mostrar siguiente
  document.getElementById(`step-${currentStep}`).classList.remove('active');
  document.getElementById(`step-${currentStep + 1}`).classList.add('active');
  
  // Actualizar indicador de progreso
  updateProgressIndicator(currentStep + 1);
  
  // Si estamos llegando al paso final, generar resumen
  if (currentStep + 1 === 5) {
    generateSummary();
  }
  
  // Scroll al inicio del formulario
  scrollToTop();
  
  return true;
}

// Función para retroceder al paso anterior
function prevStep(currentStep) {
  console.log('Retrocediendo al paso', currentStep - 1);
  
  // Ocultar paso actual y mostrar anterior
  document.getElementById(`step-${currentStep}`).classList.remove('active');
  document.getElementById(`step-${currentStep - 1}`).classList.add('active');
  
  // Actualizar indicador de progreso
  updateProgressIndicator(currentStep - 1);
  
  // Scroll al inicio del formulario
  scrollToTop();
  
  return true;
}

// Función para validar cada paso
function validateStep(step) {
  let isValid = true;
  let firstInvalidField = null;
  
  switch(step) {
    case 1: // Datos de la empresa
      const empresaFields = [
        'empresa-nombre', 'empresa-cif', 'empresa-domicilio', 
        'empresa-localidad', 'empresa-provincia', 'empresa-cp',
        'empresa-constitucion', 'empresa-registro', 'empresa-actividad',
        'empresa-representante', 'empresa-cargo'
      ];
      
      empresaFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !validateField(field)) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
        }
      });
      break;
      
    case 2: // Datos del inversor
      const inversorFields = [
        'inversor-nombre', 'inversor-nif', 'inversor-domicilio',
        'inversor-localidad', 'inversor-provincia', 'inversor-cp'
      ];
      
      inversorFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !validateField(field)) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
        }
      });
      break;
      
    case 3: // Datos de la inversión
      const inversionFields = [
        'inversion-fecha', 'inversion-importe', 'inversion-tipo',
        'inversion-participacion', 'inversion-permanencia', 'inversion-recompra'
      ];
      
      inversionFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !validateField(field)) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
        }
      });
      break;
      
    case 4: // Verificación de requisitos
      const verificacionFields = [
        'req-forma', 'req-antiguedad', 'req-cotizacion', 'req-plantilla',
        'req-volumen', 'req-actividad', 'req-patrimonio', 'req-vinculacion',
        'req-participacion', 'req-certificado'
      ];
      
      verificacionFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.checked) {
          isValid = false;
          if (!firstInvalidField) firstInvalidField = field;
        }
      });
      break;
  }
  
  // Si hay campos inválidos, enfocar el primero
  if (!isValid && firstInvalidField) {
    firstInvalidField.focus();
    // Mostrar mensaje de error
    alert('Por favor, complete todos los campos obligatorios correctamente antes de continuar.');
  }
  
  return isValid;
}

// Validar un campo individual
function validateField(field) {
  if (!field) return true; // Si el campo no existe, se considera válido
  
  // Comprobar si el campo es requerido y está vacío
  if (field.hasAttribute('required') && !field.value.trim()) {
    field.classList.add('invalid');
    return false;
  }
  
  // Comprobar si el campo tiene un patrón y no lo cumple
  if (field.hasAttribute('pattern') && field.value.trim()) {
    const pattern = new RegExp(field.getAttribute('pattern'));
    if (!pattern.test(field.value)) {
      field.classList.add('invalid');
      return false;
    }
  }
  
  // Si pasa todas las validaciones
  field.classList.remove('invalid');
  return true;
}

// Guardar datos del paso actual
function saveStepData(step) {
  switch(step) {
    case 1: // Datos de la empresa
      window.certificadoData.empresa = {
        nombre: document.getElementById('empresa-nombre')?.value || '',
        cif: document.getElementById('empresa-cif')?.value || '',
        domicilio: document.getElementById('empresa-domicilio')?.value || '',
        localidad: document.getElementById('empresa-localidad')?.value || '',
        provincia: document.getElementById('empresa-provincia')?.value || '',
        cp: document.getElementById('empresa-cp')?.value || '',
        constitucion: document.getElementById('empresa-constitucion')?.value || '',
        registro: document.getElementById('empresa-registro')?.value || '',
        actividad: document.getElementById('empresa-actividad')?.value || '',
        representante: document.getElementById('empresa-representante')?.value || '',
        cargo: document.getElementById('empresa-cargo')?.value || ''
      };
      break;
      
    case 2: // Datos del inversor
      window.certificadoData.inversor = {
        nombre: document.getElementById('inversor-nombre')?.value || '',
        nif: document.getElementById('inversor-nif')?.value || '',
        domicilio: document.getElementById('inversor-domicilio')?.value || '',
        localidad: document.getElementById('inversor-localidad')?.value || '',
        provincia: document.getElementById('inversor-provincia')?.value || '',
        cp: document.getElementById('inversor-cp')?.value || ''
      };
      break;
      
    case 3: // Datos de la inversión
      window.certificadoData.inversion = {
        fecha: document.getElementById('inversion-fecha')?.value || '',
        importe: document.getElementById('inversion-importe')?.value || '',
        tipo: document.getElementById('inversion-tipo')?.value || '',
        participacion: document.getElementById('inversion-participacion')?.value || '',
        permanencia: document.getElementById('inversion-permanencia')?.value || '',
        recompra: document.getElementById('inversion-recompra')?.value || ''
      };
      break;
      
    case 4: // Verificación de requisitos
      window.certificadoData.verificacion = {};
      const verificacionFields = [
        'req-forma', 'req-antiguedad', 'req-cotizacion', 'req-plantilla',
        'req-volumen', 'req-actividad', 'req-patrimonio', 'req-vinculacion',
        'req-participacion', 'req-certificado'
      ];
      
      verificacionFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
          window.certificadoData.verificacion[fieldId] = field.checked;
        }
      });
      break;
  }
}

// Actualizar indicador de progreso
function updateProgressIndicator(activeStep) {
  // Eliminar clase active de todos los pasos
  document.querySelectorAll('.progress-step').forEach(step => {
    step.classList.remove('active');
    step.classList.remove('completed');
  });
  
  // Añadir clase completed a los pasos completados
  for (let i = 1; i < activeStep; i++) {
    const stepElement = document.querySelector(`.progress-step[data-step="${i}"]`);
    if (stepElement) {
      stepElement.classList.add('completed');
    }
  }
  
  // Añadir clase active al paso actual
  const activeStepElement = document.querySelector(`.progress-step[data-step="${activeStep}"]`);
  if (activeStepElement) {
    activeStepElement.classList.add('active');
  }
}

// Generar resumen de datos para el paso final
function generateSummary() {
  // Resumen de datos de la empresa
  const resumenEmpresa = document.getElementById('resumen-empresa');
  if (resumenEmpresa) {
    resumenEmpresa.innerHTML = `
      <p><strong>Denominación social:</strong> ${escapeHtml(window.certificadoData.empresa.nombre)}</p>
      <p><strong>CIF:</strong> ${escapeHtml(window.certificadoData.empresa.cif)}</p>
      <p><strong>Domicilio:</strong> ${escapeHtml(window.certificadoData.empresa.domicilio)}, ${escapeHtml(window.certificadoData.empresa.localidad)}, ${escapeHtml(window.certificadoData.empresa.provincia)} (${escapeHtml(window.certificadoData.empresa.cp)})</p>
      <p><strong>Fecha de constitución:</strong> ${escapeHtml(formatDate(window.certificadoData.empresa.constitucion))}</p>
      <p><strong>Registro Mercantil:</strong> ${escapeHtml(window.certificadoData.empresa.registro)}</p>
      <p><strong>Actividad principal:</strong> ${escapeHtml(window.certificadoData.empresa.actividad)}</p>
      <p><strong>Representante legal:</strong> ${escapeHtml(window.certificadoData.empresa.representante)} (${escapeHtml(window.certificadoData.empresa.cargo)})</p>
    `;
  }
  
  // Resumen de datos del inversor
  const resumenInversor = document.getElementById('resumen-inversor');
  if (resumenInversor) {
    resumenInversor.innerHTML = `
      <p><strong>Nombre completo:</strong> ${escapeHtml(window.certificadoData.inversor.nombre)}</p>
      <p><strong>NIF:</strong> ${escapeHtml(window.certificadoData.inversor.nif)}</p>
      <p><strong>Domicilio fiscal:</strong> ${escapeHtml(window.certificadoData.inversor.domicilio)}, ${escapeHtml(window.certificadoData.inversor.localidad)}, ${escapeHtml(window.certificadoData.inversor.provincia)} (${escapeHtml(window.certificadoData.inversor.cp)})</p>
    `;
  }
  
  // Resumen de datos de la inversión
  const resumenInversion = document.getElementById('resumen-inversion');
  if (resumenInversion) {
    // Obtener texto del tipo de inversión
    let tipoInversionTexto = "No especificado";
    const tipoInversionSelect = document.getElementById('inversion-tipo');
    if (tipoInversionSelect) {
      const selectedOption = tipoInversionSelect.options[tipoInversionSelect.selectedIndex];
      if (selectedOption) {
        tipoInversionTexto = selectedOption.text;
      }
    }
    
    // Obtener texto de recompra
    let recompraTexto = window.certificadoData.inversion.recompra === 'si' ? 'Sí, tras el período mínimo legal' : 'No';
    
    resumenInversion.innerHTML = `
      <p><strong>Fecha de la inversión:</strong> ${escapeHtml(formatDate(window.certificadoData.inversion.fecha))}</p>
      <p><strong>Importe:</strong> ${escapeHtml(formatCurrency(window.certificadoData.inversion.importe))}</p>
      <p><strong>Tipo de inversión:</strong> ${escapeHtml(tipoInversionTexto)}</p>
      <p><strong>Porcentaje de participación:</strong> ${escapeHtml(window.certificadoData.inversion.participacion)}%</p>
      <p><strong>Compromiso de permanencia:</strong> ${escapeHtml(window.certificadoData.inversion.permanencia)} años</p>
      <p><strong>Cláusula de recompra:</strong> ${escapeHtml(recompraTexto)}</p>
    `;
  }
}

// Función para generar el certificado
function generarCertificado() {
  // Guardar datos de generación
  window.certificadoData.generacion = {
    fecha: document.getElementById('certificado-fecha')?.value || '',
    formato: document.getElementById('certificado-formato')?.value || '',
    firma: document.getElementById('certificado-firma')?.value || ''
  };

  // Enviar los datos al servicio de generación de PDF
  fetch('/api/certificado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(window.certificadoData)
  })
    .then(response => {
      if (!response.ok) throw new Error('Error en la generación');
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.getElementById('enlace-descarga');
      if (link) {
        link.href = url;
        link.download = 'certificado.pdf';
      }
      document.getElementById('descarga-indicaciones')?.classList.remove('hidden');

      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificado.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch(error => {
      alert('Error al generar el certificado.');
      console.error(error);
    });
}

// Función auxiliar para formatear fechas
function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Función auxiliar para formatear moneda
function formatCurrency(amount) {
  if (!amount) return '0,00 €';

  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

// Escapa caracteres especiales para evitar inyección de HTML
function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Función para hacer scroll al inicio del formulario
function scrollToTop() {
  const wizardElement = document.querySelector('.certificate-wizard');
  if (wizardElement) {
    window.scrollTo({
      top: wizardElement.offsetTop - 100,
      behavior: 'smooth'
    });
  }
}

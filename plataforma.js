/**
 * Plataforma de Conexión ConTuCuota
 * Script para gestionar el flujo interactivo del cuestionario
 */

// Datos de los cuestionarios
import { cuestionarioInversor, cuestionarioProyecto } from './src/cuestionarios.js';

// Variables globales
let tipoPerfilActual = null;
let cuestionarioActual = null;
let seccionActual = 0;
let respuestas = {};

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
  // Configurar eventos para los botones de selección de perfil
  document.querySelectorAll('.profile-card').forEach(card => {
    card.addEventListener('click', function() {
      const tipo = this.classList.contains('investor-card') ? 'inversor' : 'proyecto';
      selectProfile(tipo);
    });
  });

  // Configurar eventos para los botones de navegación
  document.getElementById('prev-button').addEventListener('click', irSeccionAnterior);
  document.getElementById('next-button').addEventListener('click', irSiguienteSeccion);
  document.getElementById('submit-button').addEventListener('click', finalizarCuestionario);

  // Configurar eventos para los botones de edición y guardado del perfil
  document.getElementById('edit-profile').addEventListener('click', editarPerfil);
  document.getElementById('save-profile').addEventListener('click', guardarPerfil);
});

// Función para seleccionar el tipo de perfil
function selectProfile(tipo) {
  tipoPerfilActual = tipo;
  cuestionarioActual = tipo === 'inversor' ? cuestionarioInversor : cuestionarioProyecto;
  seccionActual = 0;
  respuestas = {};

  // Ocultar sección de selección
  document.querySelector('.platform-selection').classList.add('hidden');
  
  // Mostrar cuestionario
  document.getElementById('questionnaire-container').classList.remove('hidden');
  
  // Configurar título según tipo de perfil
  if (tipo === 'inversor') {
    document.getElementById('questionnaire-title').textContent = 'Creación de Perfil de Inversor';
    document.getElementById('questionnaire-description').textContent = 'Completa el siguiente cuestionario para crear tu perfil de inversor y encontrar proyectos que se ajusten a tus criterios.';
  } else {
    document.getElementById('questionnaire-title').textContent = 'Registro de Proyecto';
    document.getElementById('questionnaire-description').textContent = 'Completa el siguiente cuestionario para registrar tu proyecto y conectar con inversores interesados.';
  }
  
  // Actualizar total de pasos
  document.getElementById('total-steps').textContent = cuestionarioActual.length;
  
  // Cargar primera sección
  cargarSeccion(0);
  
  // Scroll al cuestionario
  window.scrollTo({
    top: document.getElementById('questionnaire-container').offsetTop - 100,
    behavior: 'smooth'
  });
}

// Función para cargar una sección del cuestionario
function cargarSeccion(indice) {
  if (indice < 0 || indice >= cuestionarioActual.length) return;
  
  const seccion = cuestionarioActual[indice];
  const contenedor = document.getElementById('form-content');
  
  // Limpiar contenido anterior
  contenedor.innerHTML = '';
  
  // Crear título de sección
  const tituloSeccion = document.createElement('h3');
  tituloSeccion.className = 'section-title';
  tituloSeccion.textContent = seccion.seccion;
  contenedor.appendChild(tituloSeccion);
  
  // Crear preguntas
  seccion.preguntas.forEach(pregunta => {
    // Verificar dependencias
    if (pregunta.dependeDe) {
      const campoDepende = pregunta.dependeDe.campo;
      const valorEs = pregunta.dependeDe.valorEs;
      const valorNoEs = pregunta.dependeDe.valorNoEs;
      
      if ((valorEs && respuestas[campoDepende] !== valorEs) || 
          (valorNoEs && respuestas[campoDepende] === valorNoEs)) {
        return; // No mostrar esta pregunta
      }
    }
    
    // Crear grupo de formulario
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    
    // Crear etiqueta
    const label = document.createElement('label');
    label.setAttribute('for', pregunta.id);
    label.textContent = pregunta.pregunta + (pregunta.obligatorio ? ' *' : '');
    formGroup.appendChild(label);
    
    // Añadir descripción si existe
    if (pregunta.descripcion) {
      const descripcion = document.createElement('div');
      descripcion.className = 'hint';
      descripcion.textContent = pregunta.descripcion;
      formGroup.appendChild(descripcion);
    }
    
    // Crear campo según tipo
    switch (pregunta.tipo) {
      case 'texto':
        const inputTexto = document.createElement('input');
        inputTexto.type = 'text';
        inputTexto.id = pregunta.id;
        inputTexto.name = pregunta.id;
        if (pregunta.placeholder) inputTexto.placeholder = pregunta.placeholder;
        if (pregunta.maxlength) inputTexto.maxLength = pregunta.maxlength;
        if (respuestas[pregunta.id]) inputTexto.value = respuestas[pregunta.id];
        if (pregunta.obligatorio) inputTexto.required = true;
        formGroup.appendChild(inputTexto);
        break;
        
      case 'email':
        const inputEmail = document.createElement('input');
        inputEmail.type = 'email';
        inputEmail.id = pregunta.id;
        inputEmail.name = pregunta.id;
        if (pregunta.placeholder) inputEmail.placeholder = pregunta.placeholder;
        if (respuestas[pregunta.id]) inputEmail.value = respuestas[pregunta.id];
        if (pregunta.obligatorio) inputEmail.required = true;
        formGroup.appendChild(inputEmail);
        break;
        
      case 'telefono':
        const inputTelefono = document.createElement('input');
        inputTelefono.type = 'tel';
        inputTelefono.id = pregunta.id;
        inputTelefono.name = pregunta.id;
        if (pregunta.placeholder) inputTelefono.placeholder = pregunta.placeholder;
        if (respuestas[pregunta.id]) inputTelefono.value = respuestas[pregunta.id];
        if (pregunta.obligatorio) inputTelefono.required = true;
        formGroup.appendChild(inputTelefono);
        break;
        
      case 'numero':
        const inputNumero = document.createElement('input');
        inputNumero.type = 'number';
        inputNumero.id = pregunta.id;
        inputNumero.name = pregunta.id;
        if (pregunta.min !== undefined) inputNumero.min = pregunta.min;
        if (pregunta.max !== undefined) inputNumero.max = pregunta.max;
        if (respuestas[pregunta.id]) inputNumero.value = respuestas[pregunta.id];
        if (pregunta.obligatorio) inputNumero.required = true;
        formGroup.appendChild(inputNumero);
        break;
        
      case 'fecha':
        const inputFecha = document.createElement('input');
        inputFecha.type = 'date';
        inputFecha.id = pregunta.id;
        inputFecha.name = pregunta.id;
        if (respuestas[pregunta.id]) inputFecha.value = respuestas[pregunta.id];
        if (pregunta.obligatorio) inputFecha.required = true;
        formGroup.appendChild(inputFecha);
        break;
        
      case 'textarea':
        const textarea = document.createElement('textarea');
        textarea.id = pregunta.id;
        textarea.name = pregunta.id;
        if (pregunta.placeholder) textarea.placeholder = pregunta.placeholder;
        if (pregunta.maxlength) textarea.maxLength = pregunta.maxlength;
        if (respuestas[pregunta.id]) textarea.value = respuestas[pregunta.id];
        if (pregunta.obligatorio) textarea.required = true;
        formGroup.appendChild(textarea);
        break;
        
      case 'select':
        const select = document.createElement('select');
        select.id = pregunta.id;
        select.name = pregunta.id;
        if (pregunta.obligatorio) select.required = true;
        
        // Opción por defecto
        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.textContent = 'Selecciona una opción';
        optionDefault.disabled = true;
        optionDefault.selected = !respuestas[pregunta.id];
        select.appendChild(optionDefault);
        
        // Opciones
        pregunta.opciones.forEach(opcion => {
          const option = document.createElement('option');
          option.value = opcion;
          option.textContent = opcion;
          if (respuestas[pregunta.id] === opcion) option.selected = true;
          select.appendChild(option);
        });
        
        formGroup.appendChild(select);
        break;
        
      case 'radio':
        const radioGroup = document.createElement('div');
        radioGroup.className = 'option-group';
        
        pregunta.opciones.forEach((opcion, index) => {
          const optionItem = document.createElement('div');
          optionItem.className = 'option-item';
          
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.id = `${pregunta.id}_${index}`;
          radio.name = pregunta.id;
          radio.value = opcion;
          if (respuestas[pregunta.id] === opcion) radio.checked = true;
          if (pregunta.obligatorio) radio.required = true;
          
          const radioLabel = document.createElement('label');
          radioLabel.setAttribute('for', `${pregunta.id}_${index}`);
          radioLabel.textContent = opcion;
          
          optionItem.appendChild(radio);
          optionItem.appendChild(radioLabel);
          radioGroup.appendChild(optionItem);
        });
        
        formGroup.appendChild(radioGroup);
        break;
        
      case 'checkbox':
        const checkboxGroup = document.createElement('div');
        checkboxGroup.className = 'option-group';
        
        pregunta.opciones.forEach((opcion, index) => {
          const optionItem = document.createElement('div');
          optionItem.className = 'option-item';
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = `${pregunta.id}_${index}`;
          checkbox.name = `${pregunta.id}[]`;
          checkbox.value = opcion;
          
          // Verificar si esta opción está seleccionada
          if (respuestas[pregunta.id] && Array.isArray(respuestas[pregunta.id]) && 
              respuestas[pregunta.id].includes(opcion)) {
            checkbox.checked = true;
          }
          
          // Si es requerido y solo hay una opción (como términos y condiciones)
          if (pregunta.obligatorio && pregunta.requerirTodos) {
            checkbox.required = true;
          }
          
          // Limitar selecciones si es necesario
          if (pregunta.maxSelecciones) {
            checkbox.addEventListener('change', function() {
              const seleccionados = document.querySelectorAll(`input[name="${pregunta.id}[]"]:checked`);
              if (seleccionados.length > pregunta.maxSelecciones) {
                this.checked = false;
                alert(`Solo puedes seleccionar hasta ${pregunta.maxSelecciones} opciones.`);
              }
            });
          }
          
          const checkboxLabel = document.createElement('label');
          checkboxLabel.setAttribute('for', `${pregunta.id}_${index}`);
          checkboxLabel.textContent = opcion;
          
          optionItem.appendChild(checkbox);
          optionItem.appendChild(checkboxLabel);
          checkboxGroup.appendChild(optionItem);
        });
        
        formGroup.appendChild(checkboxGroup);
        break;
        
      case 'escala':
        const escalaGroup = document.createElement('div');
        escalaGroup.className = 'rating-scale';
        
        for (let i = pregunta.min; i <= pregunta.max; i++) {
          const ratingOption = document.createElement('div');
          ratingOption.className = 'rating-option';
          
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.id = `${pregunta.id}_${i}`;
          radio.name = pregunta.id;
          radio.value = i;
          if (respuestas[pregunta.id] == i) radio.checked = true;
          if (pregunta.obligatorio) radio.required = true;
          
          const label = document.createElement('label');
          label.setAttribute('for', `${pregunta.id}_${i}`);
          
          const circle = document.createElement('div');
          circle.className = 'rating-circle';
          circle.textContent = i;
          
          const text = document.createElement('span');
          text.className = 'rating-text';
          text.textContent = pregunta.etiquetas ? pregunta.etiquetas[i - pregunta.min] : i;
          
          label.appendChild(circle);
          label.appendChild(text);
          
          ratingOption.appendChild(radio);
          ratingOption.appendChild(label);
          escalaGroup.appendChild(ratingOption);
        }
        
        formGroup.appendChild(escalaGroup);
        break;
    }
    
    // Añadir grupo al contenedor
    contenedor.appendChild(formGroup);
  });
  
  // Actualizar indicadores de progreso
  document.getElementById('current-step').textContent = indice + 1;
  const progreso = ((indice + 1) / cuestionarioActual.length) * 100;
  document.getElementById('progress-indicator').style.width = `${progreso}%`;
  
  // Actualizar estado de botones
  document.getElementById('prev-button').disabled = indice === 0;
  document.getElementById('next-button').classList.toggle('hidden', indice === cuestionarioActual.length - 1);
  document.getElementById('submit-button').classList.toggle('hidden', indice !== cuestionarioActual.length - 1);
}

// Función para ir a la sección anterior
function irSeccionAnterior() {
  guardarRespuestasSeccionActual();
  seccionActual--;
  cargarSeccion(seccionActual);
  
  window.scrollTo({
    top: document.getElementById('questionnaire-container').offsetTop - 100,
    behavior: 'smooth'
  });
}

// Función para ir a la siguiente sección
function irSiguienteSeccion() {
  if (validarSeccionActual()) {
    guardarRespuestasSeccionActual();
    seccionActual++;
    cargarSeccion(seccionActual);
    
    window.scrollTo({
      top: document.getElementById('questionnaire-container').offsetTop - 100,
      behavior: 'smooth'
    });
  }
}

// Función para validar la sección actual
function validarSeccionActual() {
  const form = document.getElementById('profile-form');
  return form.checkValidity();
}

// Función para guardar las respuestas de la sección actual
function guardarRespuestasSeccionActual() {
  const seccion = cuestionarioActual[seccionActual];
  
  seccion.preguntas.forEach(pregunta => {
    switch (pregunta.tipo) {
      case 'texto':
      case 'email':
      case 'telefono':
      case 'numero':
      case 'fecha':
      case 'textarea':
      case 'select':
        const campo = document.getElementById(pregunta.id);
        if (campo) respuestas[pregunta.id] = campo.value;
        break;
        
      case 'radio':
        const radioSeleccionado = document.querySelector(`input[name="${pregunta.id}"]:checked`);
        if (radioSeleccionado) respuestas[pregunta.id] = radioSeleccionado.value;
        break;
        
      case 'checkbox':
        const checkboxesSeleccionados = document.querySelectorAll(`input[name="${pregunta.id}[]"]:checked`);
        if (checkboxesSeleccionados.length > 0) {
          respuestas[pregunta.id] = Array.from(checkboxesSeleccionados).map(cb => cb.value);
        }
        break;
        
      case 'escala':
        const escalaSeleccionada = document.querySelector(`input[name="${pregunta.id}"]:checked`);
        if (escalaSeleccionada) respuestas[pregunta.id] = escalaSeleccionada.value;
        break;
    }
  });
}

// Función para finalizar el cuestionario
function finalizarCuestionario() {
  if (validarSeccionActual()) {
    guardarRespuestasSeccionActual();
    
    // Ocultar cuestionario
    document.getElementById('questionnaire-container').classList.add('hidden');
    
    // Mostrar resultado
    document.getElementById('profile-result').classList.remove('hidden');
    
    // Generar ficha de perfil
    generarFichaPerfil();
    
    window.scrollTo({
      top: document.getElementById('profile-result').offsetTop - 100,
      behavior: 'smooth'
    });
  }
}

// Función para generar la ficha de perfil
function generarFichaPerfil() {
  const perfilCard = document.getElementById('profile-card');
  perfilCard.innerHTML = '';
  
  // Título del perfil
  const titulo = document.createElement('h3');
  titulo.className = 'profile-title';
  
  if (tipoPerfilActual === 'inversor') {
    titulo.textContent = `Perfil de Inversor: ${respuestas.nombre || 'Sin nombre'}`;
  } else {
    titulo.textContent = `Perfil de Proyecto: ${respuestas.nombre_proyecto || 'Sin nombre'}`;
  }
  
  perfilCard.appendChild(titulo);
  
  // Recorrer secciones del cuestionario
  cuestionarioActual.forEach(seccion => {
    const seccionDiv = document.createElement('div');
    seccionDiv.className = 'profile-summary-section';
    
    const seccionTitulo = document.createElement('h3');
    seccionTitulo.textContent = seccion.seccion;
    seccionDiv.appendChild(seccionTitulo);
    
    // Recorrer preguntas de la sección
    seccion.preguntas.forEach(pregunta => {
      // Verificar si hay respuesta para esta pregunta
      if (respuestas[pregunta.id]) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'profile-summary-item';
        
        const label = document.createElement('div');
        label.className = 'profile-summary-label';
        label.textContent = pregunta.pregunta;
        
        const value = document.createElement('div');
        value.className = 'profile-summary-value';
        
        // Formatear valor según tipo
        switch (pregunta.tipo) {
          case 'checkbox':
            if (Array.isArray(respuestas[pregunta.id])) {
              value.textContent = respuestas[pregunta.id].join(', ');
            }
            break;
            
          case 'escala':
            const indice = parseInt(respuestas[pregunta.id]) - pregunta.min;
            if (pregunta.etiquetas && pregunta.etiquetas[indice]) {
              value.textContent = `${respuestas[pregunta.id]} - ${pregunta.etiquetas[indice]}`;
            } else {
              value.textContent = respuestas[pregunta.id];
            }
            break;
            
          default:
            value.textContent = respuestas[pregunta.id];
        }
        
        itemDiv.appendChild(label);
        itemDiv.appendChild(value);
        seccionDiv.appendChild(itemDiv);
      }
    });
    
    // Solo añadir sección si tiene contenido
    if (seccionDiv.querySelectorAll('.profile-summary-item').length > 0) {
      perfilCard.appendChild(seccionDiv);
    }
  });
}

// Función para editar el perfil
function editarPerfil() {
  // Ocultar resultado
  document.getElementById('profile-result').classList.add('hidden');
  
  // Mostrar cuestionario
  document.getElementById('questionnaire-container').classList.remove('hidden');
  
  // Volver a la primera sección
  seccionActual = 0;
  cargarSeccion(seccionActual);
  
  window.scrollTo({
    top: document.getElementById('questionnaire-container').offsetTop - 100,
    behavior: 'smooth'
  });
}

// Función para guardar el perfil
function guardarPerfil() {
  // Aquí se implementaría la lógica para enviar los datos al servidor
  // Por ahora, solo mostraremos un mensaje de éxito
  
  alert('¡Tu perfil ha sido guardado con éxito! Pronto nos pondremos en contacto contigo.');
  
  // Volver a la página principal
  window.location.href = 'index.html';
}

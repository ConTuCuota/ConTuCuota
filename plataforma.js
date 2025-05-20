/**
 * Plataforma de Conexión ConTuCuota
 * Script para gestionar el flujo interactivo del cuestionario
 */

// Datos de los cuestionarios
const cuestionarioInversor = [
  // Sección 1: Datos Personales y de Contacto
  {
    seccion: "Datos Personales y de Contacto",
    preguntas: [
      {
        id: "nombre",
        tipo: "texto",
        pregunta: "Nombre completo",
        obligatorio: true,
        placeholder: "Introduce tu nombre completo"
      },
      {
        id: "email",
        tipo: "email",
        pregunta: "Correo electrónico",
        obligatorio: true,
        placeholder: "ejemplo@correo.com"
      },
      {
        id: "telefono",
        tipo: "telefono",
        pregunta: "Teléfono de contacto",
        obligatorio: true,
        placeholder: "Ej. 612345678"
      },
      {
        id: "ubicacion",
        tipo: "select",
        pregunta: "Ubicación geográfica",
        obligatorio: true,
        opciones: ["Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lérida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Orense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"]
      },
      {
        id: "perfil_profesional",
        tipo: "textarea",
        pregunta: "Perfil profesional",
        descripcion: "Breve descripción de tu experiencia profesional y áreas de expertise",
        obligatorio: true,
        placeholder: "Describe tu experiencia profesional...",
        maxlength: 500
      }
    ]
  },
  // Sección 2: Experiencia como Inversor
  {
    seccion: "Experiencia como Inversor",
    preguntas: [
      {
        id: "experiencia_previa",
        tipo: "radio",
        pregunta: "¿Has realizado inversiones previamente?",
        obligatorio: true,
        opciones: [
          "No, sería mi primera inversión",
          "Sí, en bolsa o fondos de inversión",
          "Sí, en startups o empresas privadas",
          "Sí, en inmobiliario",
          "Sí, en varios tipos de activos"
        ]
      },
      {
        id: "sectores_previos",
        tipo: "checkbox",
        pregunta: "Si has invertido previamente, ¿en qué sectores?",
        obligatorio: false,
        dependeDe: {
          campo: "experiencia_previa",
          valorNoEs: "No, sería mi primera inversión"
        },
        opciones: [
          "Tecnología",
          "Salud y biotecnología",
          "Energía y sostenibilidad",
          "Agroindustria",
          "Finanzas",
          "Inmobiliario",
          "Comercio y retail",
          "Educación",
          "Entretenimiento y medios",
          "Industria y manufactura",
          "Otros"
        ]
      },
      {
        id: "conocimiento_deducciones",
        tipo: "escala",
        pregunta: "¿Cuál es tu nivel de conocimiento sobre deducciones fiscales para inversores?",
        obligatorio: true,
        min: 1,
        max: 5,
        etiquetas: ["Muy bajo", "Bajo", "Medio", "Alto", "Experto"]
      }
    ]
  },
  // Sección 3: Preferencias de Inversión
  {
    seccion: "Preferencias de Inversión",
    preguntas: [
      {
        id: "sectores_interes",
        tipo: "checkbox",
        pregunta: "¿Qué sectores te interesan para invertir?",
        descripcion: "Selecciona hasta 3 sectores prioritarios",
        obligatorio: true,
        maxSelecciones: 3,
        opciones: [
          "Tecnología e innovación",
          "Agroindustria y alimentación",
          "Energía renovable",
          "Medioambiente y agua",
          "Cultura y audiovisual",
          "Salud y biotecnología",
          "Educación y formación",
          "Movilidad y logística",
          "Sectores tradicionales",
          "Impacto social",
          "Otros"
        ]
      },
      {
        id: "ticket_inversion",
        tipo: "radio",
        pregunta: "¿Qué ticket de inversión anual estás considerando?",
        obligatorio: true,
        opciones: [
          "5.000€ - 10.000€",
          "10.001€ - 25.000€",
          "25.001€ - 50.000€",
          "50.001€ - 100.000€",
          "Más de 100.000€"
        ]
      },
      {
        id: "anos_inversion",
        tipo: "radio",
        pregunta: "¿Durante cuántos años consecutivos estarías dispuesto a invertir?",
        obligatorio: true,
        opciones: [
          "1 año",
          "2 años",
          "3 años",
          "4 años",
          "5 años"
        ]
      },
      {
        id: "horizonte_temporal",
        tipo: "radio",
        pregunta: "¿Cuál es tu horizonte temporal para la inversión?",
        obligatorio: true,
        opciones: [
          "Corto plazo (1-3 años)",
          "Medio plazo (4-6 años)",
          "Largo plazo (más de 6 años)"
        ]
      },
      {
        id: "expectativa_rentabilidad",
        tipo: "radio",
        pregunta: "¿Qué expectativa de rentabilidad anual buscas?",
        obligatorio: true,
        opciones: [
          "Principalmente la deducción fiscal (hasta 50%)",
          "Moderada (5-10% adicional a la deducción)",
          "Media (10-20% adicional a la deducción)",
          "Alta (más del 20% adicional a la deducción)"
        ]
      }
    ]
  },
  // Sección 4: Criterios de Selección y Riesgo
  {
    seccion: "Criterios de Selección y Riesgo",
    preguntas: [
      {
        id: "fase_preferida",
        tipo: "checkbox",
        pregunta: "¿En qué fase de desarrollo prefieres invertir?",
        obligatorio: true,
        opciones: [
          "Idea o concepto",
          "Prototipo o MVP",
          "Primeras ventas",
          "Crecimiento y expansión",
          "Consolidación"
        ]
      },
      {
        id: "importancia_impacto",
        tipo: "escala",
        pregunta: "¿Qué importancia das al impacto social o ambiental del proyecto?",
        obligatorio: true,
        min: 1,
        max: 5,
        etiquetas: ["No es relevante", "Poco relevante", "Relevante", "Muy relevante", "Es fundamental"]
      },
      {
        id: "preferencias_geograficas",
        tipo: "checkbox",
        pregunta: "¿Tienes preferencias geográficas para los proyectos?",
        obligatorio: true,
        opciones: [
          "Proyectos locales (mi provincia)",
          "Proyectos regionales (mi comunidad autónoma)",
          "Proyectos nacionales (España)",
          "Sin preferencia geográfica"
        ]
      },
      {
        id: "nivel_implicacion",
        tipo: "radio",
        pregunta: "¿Qué nivel de implicación deseas tener en los proyectos?",
        obligatorio: true,
        opciones: [
          "Pasivo (solo aportación de capital)",
          "Moderado (seguimiento periódico)",
          "Activo (asesoramiento y mentorización)",
          "Muy activo (participación en decisiones estratégicas)"
        ]
      },
      {
        id: "tolerancia_riesgo",
        tipo: "escala",
        pregunta: "¿Cuál es tu tolerancia al riesgo?",
        obligatorio: true,
        min: 1,
        max: 5,
        etiquetas: ["Muy baja", "Baja", "Media", "Alta", "Muy alta"]
      }
    ]
  },
  // Sección 5: Aspectos Fiscales y Legales
  {
    seccion: "Aspectos Fiscales y Legales",
    preguntas: [
      {
        id: "rango_cuota",
        tipo: "radio",
        pregunta: "¿Cuál es tu rango de cuota íntegra estatal en IRPF?",
        descripcion: "Esta información nos ayuda a optimizar las recomendaciones fiscales",
        obligatorio: false,
        opciones: [
          "Menos de 5.000€",
          "5.000€ - 10.000€",
          "10.001€ - 25.000€",
          "25.001€ - 50.000€",
          "Más de 50.000€",
          "Prefiero no especificar"
        ]
      },
      {
        id: "deducciones_previas",
        tipo: "radio",
        pregunta: "¿Has aplicado anteriormente deducciones por inversión en empresas de nueva creación?",
        obligatorio: true,
        opciones: [
          "Sí",
          "No"
        ]
      },
      {
        id: "documentacion_verificacion",
        tipo: "checkbox",
        pregunta: "¿Qué documentación estás dispuesto a proporcionar para verificar tu perfil?",
        obligatorio: true,
        opciones: [
          "Identificación oficial",
          "Comprobante de domicilio",
          "Declaración de la renta (casillas relevantes)",
          "Historial de inversiones previas",
          "Certificación profesional"
        ]
      },
      {
        id: "asesoramiento",
        tipo: "radio",
        pregunta: "¿Aceptas recibir asesoramiento fiscal y legal como parte del proceso?",
        obligatorio: true,
        opciones: [
          "Sí",
          "No"
        ]
      }
    ]
  },
  // Sección 6: Información Adicional
  {
    seccion: "Información Adicional",
    preguntas: [
      {
        id: "como_conocio",
        tipo: "radio",
        pregunta: "¿Cómo conociste ConTuCuota?",
        obligatorio: true,
        opciones: [
          "Recomendación personal",
          "Redes sociales",
          "Búsqueda en internet",
          "Evento o conferencia",
          "Prensa o medios",
          "Otro"
        ]
      },
      {
        id: "informacion_adicional",
        tipo: "textarea",
        pregunta: "¿Hay alguna información adicional que quieras compartir?",
        obligatorio: false,
        placeholder: "Comparte cualquier información adicional relevante...",
        maxlength: 1000
      },
      {
        id: "terminos",
        tipo: "checkbox",
        pregunta: "¿Aceptas los términos y condiciones y la política de privacidad?",
        obligatorio: true,
        opciones: [
          "Acepto los términos y condiciones y la política de privacidad"
        ],
        requerirTodos: true
      }
    ]
  }
];

const cuestionarioProyecto = [
  // Sección 1: Información Básica del Proyecto
  {
    seccion: "Información Básica del Proyecto",
    preguntas: [
      {
        id: "nombre_proyecto",
        tipo: "texto",
        pregunta: "Nombre del proyecto/empresa",
        obligatorio: true,
        placeholder: "Introduce el nombre de tu proyecto o empresa"
      },
      {
        id: "email_proyecto",
        tipo: "email",
        pregunta: "Correo electrónico de contacto",
        obligatorio: true,
        placeholder: "ejemplo@proyecto.com"
      },
      {
        id: "telefono_proyecto",
        tipo: "telefono",
        pregunta: "Teléfono de contacto",
        obligatorio: true,
        placeholder: "Ej. 612345678"
      },
      {
        id: "ubicacion_proyecto",
        tipo: "select",
        pregunta: "Ubicación del proyecto",
        obligatorio: true,
        opciones: ["Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lérida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Orense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza"]
      },
      {
        id: "web_proyecto",
        tipo: "texto",
        pregunta: "Sitio web o redes sociales",
        obligatorio: false,
        placeholder: "https://www.tuproyecto.com o @tuproyecto"
      },
      {
        id: "sector_proyecto",
        tipo: "radio",
        pregunta: "Sector principal de actividad",
        obligatorio: true,
        opciones: [
          "Tecnología e innovación",
          "Agroindustria y alimentación",
          "Energía renovable",
          "Medioambiente y agua",
          "Cultura y audiovisual",
          "Salud y biotecnología",
          "Educación y formación",
          "Movilidad y logística",
          "Sectores tradicionales",
          "Impacto social",
          "Otros"
        ]
      },
      {
        id: "fase_proyecto",
        tipo: "radio",
        pregunta: "Fase actual del proyecto",
        obligatorio: true,
        opciones: [
          "Idea o concepto",
          "Prototipo o MVP",
          "Primeras ventas",
          "Crecimiento y expansión",
          "Consolidación"
        ]
      }
    ]
  },
  // Sección 2: Equipo Fundador
  {
    seccion: "Equipo Fundador",
    preguntas: [
      {
        id: "num_fundadores",
        tipo: "numero",
        pregunta: "Número de fundadores/socios",
        obligatorio: true,
        min: 1,
        max: 20
      },
      {
        id: "experiencia_equipo",
        tipo: "textarea",
        pregunta: "Experiencia del equipo fundador",
        descripcion: "Breve resumen de la experiencia y habilidades clave del equipo",
        obligatorio: true,
        placeholder: "Describe la experiencia y habilidades del equipo...",
        maxlength: 1000
      },
      {
        id: "experiencia_sector",
        tipo: "radio",
        pregunta: "¿Cuenta el equipo con experiencia previa en el sector?",
        obligatorio: true,
        opciones: [
          "Sí, más de 5 años",
          "Sí, entre 2 y 5 años",
          "Sí, menos de 2 años",
          "No, pero tenemos experiencia en sectores relacionados",
          "No tenemos experiencia previa en el sector"
        ]
      },
      {
        id: "experiencia_emprendimiento",
        tipo: "radio",
        pregunta: "¿Cuenta el equipo con experiencia previa en emprendimiento?",
        obligatorio: true,
        opciones: [
          "Sí, hemos fundado empresas exitosas anteriormente",
          "Sí, hemos tenido experiencias de emprendimiento con resultados mixtos",
          "No, es nuestra primera experiencia emprendiendo"
        ]
      },
      {
        id: "dedicacion_equipo",
        tipo: "radio",
        pregunta: "Dedicación del equipo al proyecto",
        obligatorio: true,
        opciones: [
          "Tiempo completo (todos los fundadores)",
          "Tiempo completo (algunos fundadores)",
          "Tiempo parcial (todos los fundadores)",
          "Tiempo parcial (algunos fundadores)"
        ]
      }
    ]
  },
  // Sección 3: Detalles del Proyecto
  {
    seccion: "Detalles del Proyecto",
    preguntas: [
      {
        id: "problema",
        tipo: "textarea",
        pregunta: "Descripción del problema que resuelve",
        descripcion: "¿Qué problema o necesidad aborda tu proyecto?",
        obligatorio: true,
        placeholder: "Describe el problema que resuelve tu proyecto...",
        maxlength: 1000
      },
      {
        id: "solucion",
        tipo: "textarea",
        pregunta: "Solución propuesta",
        descripcion: "¿Cómo resuelve tu proyecto el problema identificado?",
        obligatorio: true,
        placeholder: "Describe la solución que propone tu proyecto...",
        maxlength: 1000
      },
      {
        id: "propuesta_valor",
        tipo: "textarea",
        pregunta: "Propuesta de valor única",
        descripcion: "¿Qué hace diferente a tu solución de las alternativas existentes?",
        obligatorio: true,
        placeholder: "Describe tu propuesta de valor diferencial...",
        maxlength: 500
      },
      {
        id: "modelo_negocio",
        tipo: "textarea",
        pregunta: "Modelo de negocio",
        descripcion: "¿Cómo genera o generará ingresos tu proyecto?",
        obligatorio: true,
        placeholder: "Describe tu modelo de negocio...",
        maxlength: 1000
      },
      {
        id: "mercado_objetivo",
        tipo: "textarea",
        pregunta: "Mercado objetivo",
        descripcion: "Describe tu cliente ideal y el tamaño estimado del mercado",
        obligatorio: true,
        placeholder: "Describe tu mercado objetivo...",
        maxlength: 500
      },
      {
        id: "competencia",
        tipo: "textarea",
        pregunta: "Competencia principal",
        descripcion: "¿Quiénes son tus principales competidores y cómo te diferencias?",
        obligatorio: true,
        placeholder: "Describe tu competencia y diferenciación...",
        maxlength: 500
      }
    ]
  },
  // Sección 4: Tracción y Métricas
  {
    seccion: "Tracción y Métricas",
    preguntas: [
      {
        id: "proyecto_operativo",
        tipo: "radio",
        pregunta: "¿El proyecto ya está operativo?",
        obligatorio: true,
        opciones: [
          "Sí, ya tenemos clientes/usuarios",
          "Sí, pero aún no tenemos clientes/usuarios",
          "No, estamos en fase de desarrollo"
        ]
      },
      {
        id: "tiempo_operativo",
        tipo: "radio",
        pregunta: "Si ya está operativo, ¿cuánto tiempo lleva en funcionamiento?",
        obligatorio: false,
        dependeDe: {
          campo: "proyecto_operativo",
          valorNoEs: "No, estamos en fase de desarrollo"
        },
        opciones: [
          "Menos de 6 meses",
          "Entre 6 meses y 1 año",
          "Entre 1 y 2 años",
          "Más de 2 años",
          "No aplica"
        ]
      },
      {
        id: "metricas_actuales",
        tipo: "textarea",
        pregunta: "Métricas actuales",
        descripcion: "Comparte las métricas relevantes (usuarios, clientes, ingresos, etc.)",
        obligatorio: false,
        dependeDe: {
          campo: "proyecto_operativo",
          valorEs: "Sí, ya tenemos clientes/usuarios"
        },
        placeholder: "Describe las métricas actuales de tu proyecto...",
        maxlength: 500
      },
      {
        id: "crecimiento",
        tipo: "radio",
        pregunta: "Crecimiento en los últimos 6 meses",
        obligatorio: false,
        dependeDe: {
          campo: "proyecto_operativo",
          valorEs: "Sí, ya tenemos clientes/usuarios"
        },
        opciones: [
          "Más del 100%",
          "Entre 50% y 100%",
          "Entre 20% y 50%",
          "Menos del 20%",
          "Sin crecimiento o decrecimiento",
          "No aplica (proyecto nuevo)"
        ]
      }
    ]
  },
  // Sección 5: Necesidades Financieras
  {
    seccion: "Necesidades Financieras",
    preguntas: [
      {
        id: "capital_buscado",
        tipo: "radio",
        pregunta: "Capital total buscado",
        obligatorio: true,
        opciones: [
          "Menos de 50.000€",
          "50.000€ - 100.000€",
          "100.001€ - 250.000€",
          "250.001€ - 500.000€",
          "500.001€ - 1.000.000€",
          "Más de 1.000.000€"
        ]
      },
      {
        id: "ticket_minimo",
        tipo: "radio",
        pregunta: "Ticket mínimo por inversor",
        obligatorio: true,
        opciones: [
          "5.000€",
          "10.000€",
          "25.000€",
          "50.000€",
          "100.000€",
          "Otro"
        ]
      },
      {
        id: "uso_fondos",
        tipo: "checkbox",
        pregunta: "Uso previsto de los fondos",
        descripcion: "Selecciona las principales áreas y su porcentaje aproximado",
        obligatorio: true,
        opciones: [
          "Desarrollo de producto",
          "Marketing y adquisición de clientes",
          "Contratación de personal",
          "Expansión geográfica",
          "Investigación y desarrollo",
          "Operaciones y gastos corrientes",
          "Compra de equipamiento",
          "Otro"
        ]
      },
      {
        id: "financiacion_previa",
        tipo: "radio",
        pregunta: "¿Has recibido financiación previa?",
        obligatorio: true,
        opciones: [
          "No, sería nuestra primera ronda",
          "Sí, capital de los fundadores",
          "Sí, familiares y amigos (FFF)",
          "Sí, inversores ángel",
          "Sí, capital riesgo",
          "Sí, subvenciones o ayudas públicas",
          "Sí, financiación bancaria"
        ]
      },
      {
        id: "importe_financiacion_previa",
        tipo: "texto",
        pregunta: "Si has recibido financiación previa, ¿de qué importe?",
        obligatorio: false,
        dependeDe: {
          campo: "financiacion_previa",
          valorNoEs: "No, sería nuestra primera ronda"
        },
        placeholder: "Ej. 50000"
      }
    ]
  },
  // Sección 6: Aspectos Legales y Fiscales
  {
    seccion: "Aspectos Legales y Fiscales",
    preguntas: [
      {
        id: "forma_juridica",
        tipo: "radio",
        pregunta: "Forma jurídica actual",
        obligatorio: true,
        opciones: [
          "Aún no constituida",
          "Autónomo",
          "Sociedad Limitada (S.L.)",
          "Sociedad Anónima (S.A.)",
          "Sociedad Limitada Nueva Empresa (S.L.N.E.)",
          "Cooperativa",
          "Otra"
        ]
      },
      {
        id: "fecha_constitucion",
        tipo: "fecha",
        pregunta: "Fecha de constitución (si aplica)",
        obligatorio: false,
        dependeDe: {
          campo: "forma_juridica",
          valorNoEs: "Aún no constituida"
        }
      },
      {
        id: "requisitos_deduccion",
        tipo: "radio",
        pregunta: "¿Cumple tu proyecto los requisitos para la deducción fiscal por inversión?",
        descripcion: "Para aplicar la deducción, la empresa debe ser de nueva creación, tener actividad económica, no gestionar patrimonio inmobiliario, entre otros requisitos.",
        obligatorio: true,
        opciones: [
          "Sí, cumplimos todos los requisitos",
          "Creemos que sí, pero necesitamos verificarlo",
          "No estamos seguros",
          "No, no cumplimos algún requisito esencial"
        ]
      },
      {
        id: "propiedad_intelectual",
        tipo: "checkbox",
        pregunta: "¿Dispone el proyecto de propiedad intelectual o industrial?",
        obligatorio: true,
        opciones: [
          "No",
          "Sí, patentes (concedidas o en trámite)",
          "Sí, marcas registradas",
          "Sí, modelos de utilidad",
          "Sí, derechos de autor",
          "Sí, secretos comerciales",
          "Otro"
        ]
      }
    ]
  },
  // Sección 7: Proyecciones y Estrategia
  {
    seccion: "Proyecciones y Estrategia",
    preguntas: [
      {
        id: "proyeccion_ingresos",
        tipo: "textarea",
        pregunta: "Proyección de ingresos a 3 años",
        descripcion: "Resume brevemente tus proyecciones financieras para los próximos 3 años",
        obligatorio: true,
        placeholder: "Describe tus proyecciones financieras...",
        maxlength: 500
      },
      {
        id: "estrategia_salida",
        tipo: "checkbox",
        pregunta: "Estrategia de salida prevista para inversores",
        obligatorio: true,
        opciones: [
          "Recompra por parte de los fundadores",
          "Venta a un competidor o empresa del sector",
          "Entrada de un fondo de inversión",
          "Salida a bolsa (IPO)",
          "Distribución de dividendos",
          "Aún no definida"
        ]
      },
      {
        id: "horizonte_salida",
        tipo: "radio",
        pregunta: "Horizonte temporal estimado para la estrategia de salida",
        obligatorio: true,
        opciones: [
          "1-3 años",
          "4-5 años",
          "6-8 años",
          "Más de 8 años",
          "No definido"
        ]
      },
      {
        id: "rentabilidad_potencial",
        tipo: "radio",
        pregunta: "Rentabilidad potencial estimada para inversores",
        obligatorio: true,
        opciones: [
          "Principalmente la deducción fiscal (hasta 50%)",
          "Moderada (5-10% adicional a la deducción)",
          "Media (10-20% adicional a la deducción)",
          "Alta (más del 20% adicional a la deducción)"
        ]
      }
    ]
  },
  // Sección 8: Información Adicional
  {
    seccion: "Información Adicional",
    preguntas: [
      {
        id: "como_conocio_proyecto",
        tipo: "radio",
        pregunta: "¿Cómo conociste ConTuCuota?",
        obligatorio: true,
        opciones: [
          "Recomendación personal",
          "Redes sociales",
          "Búsqueda en internet",
          "Evento o conferencia",
          "Prensa o medios",
          "Otro"
        ]
      },
      {
        id: "documentacion_verificacion_proyecto",
        tipo: "checkbox",
        pregunta: "¿Qué documentación estás dispuesto a proporcionar para verificar tu proyecto?",
        obligatorio: true,
        opciones: [
          "Plan de negocio",
          "Proyecciones financieras detalladas",
          "Estatutos y documentación legal",
          "Pitch deck",
          "Demostraciones de producto",
          "Referencias de clientes o partners"
        ]
      },
      {
        id: "informacion_adicional_proyecto",
        tipo: "textarea",
        pregunta: "¿Hay alguna información adicional relevante que quieras compartir?",
        obligatorio: false,
        placeholder: "Comparte cualquier información adicional relevante...",
        maxlength: 1000
      },
      {
        id: "terminos_proyecto",
        tipo: "checkbox",
        pregunta: "¿Aceptas los términos y condiciones y la política de privacidad?",
        obligatorio: true,
        opciones: [
          "Acepto los términos y condiciones y la política de privacidad"
        ],
        requerirTodos: true
      }
    ]
  }
];

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

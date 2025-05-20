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

export { cuestionarioInversor, cuestionarioProyecto };

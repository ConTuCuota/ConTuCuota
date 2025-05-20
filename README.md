# ConTuCuota

ConTuCuota es una plataforma que permite invertir el IRPF de forma
productiva aprovechando las ventajas fiscales vigentes. El proyecto
incluye simuladores y herramientas web desarrolladas con JavaScript
que ayudan a calcular retornos y gestionar aportaciones de manera
transparente.

## Instalaci\u00f3n de dependencias

Para instalar las dependencias del proyecto utiliza `npm`:

```bash
npm install
```

Esto instalar\u00e1 las dependencias declaradas en `package.json`, como el
framework de pruebas `jest`.

## Ejecuci\u00f3n de pruebas

El proyecto cuenta con pruebas autom\u00e1ticas ubicadas en la carpeta
`tests`. Para ejecutarlas utiliza el siguiente comando:

```bash
npm test
```

## Variables de entorno

La API que genera certificados lee las siguientes variables de entorno:

- `PORT`: puerto en el que se inicia el servidor (por defecto `3000`).
- `NODE_ENV`: si vale `production` se redirigen las peticiones HTTP a HTTPS.

## C\u00f3mo contribuir

1. Haz un *fork* de este repositorio y cl\u00f3nalo en tu equipo.
2. Crea una rama para tu cambio: `git checkout -b mi-contribucion`.
3. Realiza tus modificaciones y aseg\u00farte de que las pruebas sigan
   pasando con `npm test`.
4. Env\u00eda un *pull request* describiendo tus cambios.

Toda ayuda es bienvenida para mejorar la plataforma y sus
funcionalidades.

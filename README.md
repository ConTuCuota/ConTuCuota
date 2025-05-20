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
`tests`. Antes de ejecutarlas asegúrate de instalar las dependencias con `npm install` — durante el desarrollo se utilizó Node.js 18. Luego utiliza el siguiente comando:
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

## P\u00e1ginas principales

El proyecto incluye diversas p\u00e1ginas HTML que conforman la interfaz p\u00fablica:

- **`index.html`**: p\u00e1gina de inicio con informaci\u00f3n general del proyecto y enlaces a las dem\u00e1s secciones.
- **`simulador.html`**: permite introducir par\u00e1metros de inversi\u00f3n y visualizar los flujos financieros resultantes.
- **`certificados.html`**: interfaz para generar certificados fiscales en PDF a trav\u00e9s del servicio Express.
- **`plataforma.html`**: describe la plataforma que conecta a inversores y proyectos en busca de financiaci\u00f3n.

## Servidor Express

Para ejecutar el servicio que genera certificados se utiliza `server.js`. Primero instala las dependencias y luego inicia el servidor:

```bash
npm install
npm start
```

El servidor escuchar\u00e1 en el puerto definido por la variable de entorno `PORT` (por defecto `3000`).

## Protección con contraseña

Para entornos de prueba se puede activar una capa de autenticación básica estableciendo la variable `PREVIEW_PASSWORD`. Ejecuta el servidor de la siguiente forma:

```bash
PREVIEW_PASSWORD=<tu_clave> npm start
```

Si la cabecera `Authorization` enviada por el cliente no coincide con la clave configurada, el servidor responderá con `401` y la cabecera `WWW-Authenticate` indicando el *realm* "Preview".

## Despliegue en producci\u00f3n

En entornos productivos se recomienda utilizar un gestor de procesos como `pm2` o bien contenerizar la aplicaci\u00f3n.

### Ejemplo con pm2

```bash
pm2 start server.js --name contucuota
```

### Ejemplo b\u00e1sico con Docker

```bash
docker build -t contucuota .
docker run -p 3000:3000 --env PORT=3000 contucuota
```
\n## Backend API

El directorio `backend/` incluye un servidor Express con Prisma y
autenticaci\u00f3n JWT. Proporciona endpoints REST para la gesti\u00f3n de
usuarios, inversores, proyectos y la generaci\u00f3n de certificados en
PDF.

Consulta `backend/README.md` para conocer las variables de entorno
necesarias, pasos de despliegue y comandos de desarrollo.

# ConTuCuota Backend

Este directorio contiene una API REST escrita con Express y Prisma que
proporciona funcionalidad para la gesti\u00f3n de usuarios, inversores,
proyectos y generaci\u00f3n de certificados en PDF.

## Variables de entorno

- `DATABASE_URL`: cadena de conexi\u00f3n a PostgreSQL (por ejemplo,
  `postgresql://user:password@localhost:5432/contucuota`).
- `JWT_SECRET`: clave utilizada para firmar los tokens JWT.
- `PORT`: puerto en el que se iniciar\u00e1 el servidor (por defecto 4000).

Copia el archivo `.env.example` a `.env` y ajusta estos valores antes de
iniciar la aplicaci\u00f3n.

## Puesta en marcha

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicializa la base de datos y genera el cliente Prisma:

   ```bash
   npx prisma migrate deploy
   ```

3. Inicia el servidor:

   ```bash
   npm run dev
   ```

La API quedar\u00e1 disponible en `http://localhost:4000/`.

## Despliegue

En producci\u00f3n se recomienda emplear un gestor de procesos como `pm2` o
contenizar el servidor con Docker. Aseg\u00farate de establecer las
variables de entorno y de ejecutar `prisma migrate deploy` contra la
base de datos de producci\u00f3n.

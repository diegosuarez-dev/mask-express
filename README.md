#### Tabla de contenidos

[Mask Express API](#Mask-Express-API)
[Documentación de la API](##Documentación-de-la-API)
[Requisitos mínimos](##Requisitos-mínimos)
[Fase actual del desarrollo](##Fase-actual-del-desarrollo:-Desarrollo-finalizado-🚀)
[Construido con](##Construido-con-🛠️)
[Scripts disponibles (funcionamiento)](<##Scripts-Disponibles-(funcionamiento)>)

# Mask Express API

Reto final propuesto por el bootcamp de backend online de GeeksHubsAcademy. Consiste en la elaboración de una API REST de un e-commerce online. Para ello he decidido crear una tienda online de mascarillas.

## Documentación de la API

La documentación de la API se ha realizado con postman y se puede consultar [aquí](https://documenter.getpostman.com/view/13229790/TVt2cNyg)

Es posible descargar la colección fácilmente para usar en la app de escritorio de Postman. Para ello, sólo es necesario pulsar el botón "Run in Postman" que está situado en la esquina superior derecha de la documentación.

Nota: para que los endpoints que requiren autorización funcionen correctamente, será necesario realizar el proceso de registro/login y utilizar el token en los headers.

## Requisitos mínimos

Feature 1: Gestión Usuario

- Validación por token.
- Endpoint de Login.
- Endpoint de Registro.
- Endpoint de Perfil.
- Extra points: roles (administrador, usuario y vendedor) y endpoints para modificar datos de usuario.

Feature 2: Gestión Producto

- Endpoints añadir, eliminar, modificar producto (vendedor).
- Endpoints muestra all products.
- Endpoints productos filtro.
- Extra points: endpoint de productos por vendedor y por categoría

Feature 3: Gestión Compras

- Endpoint añadir compra.
- Endpoint muestra todas las compras.
- Extra points: endpoint de compras por usuario (modo factura).
- Requisitos extra: endpoint modificación datos factura (vendedor).

## Fase actual del desarrollo: Desarrollo finalizado 🚀

La API cubre los requisitos mínimos, los extra y alguno adicional. Tanto para productos como para compras, todos los métodos de búsqueda tienen filtros opcionales, cubriendo así los requisitos de "get all" y de filtrado y ordenado por parámetros.

## Construido con 🛠️

NodeJS, Express, Mongoose, Git, BcryptJS, JWT-simple, MomentJS.

[Ir al inicio](#Tabla-de-contenidos)

## Scripts Disponibles (funcionamiento)

En el directorio del proyecto puedes ejecutar:

### `npm install`

Instala todas las dependencias del package.json.

### `npm start`

Ejecuta la aplicación en el modo de desarrollo.<br />
Abre [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

La página se recargará si haces cambios y los guardas.<br />
También puedes ver errores en la consola.

[Ir al inicio](#Tabla-de-contenidos)

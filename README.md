# Akika API — E-commerce Backend

API REST para el e-commerce Akika. Gestiona usuarios, autenticación, verificación por email, productos, categorías y pedidos.

**API publicada:** [proyecto-final-back-six.vercel.app](https://proyecto-final-back-six.vercel.app/)

## Funcionalidades

- Registro e inicio de sesión de usuarios.
- Contraseñas protegidas con `bcrypt`.
- Autenticación mediante JSON Web Tokens.
- Verificación de cuentas por correo electrónico.
- CRUD de productos.
- Creación y consulta de pedidos protegidos.
- Gestión de categorías.
- Validación de datos y manejo centralizado de errores de validación.

## Tecnologías

- Node.js
- Express
- TypeScript
- MongoDB y Mongoose
- JSON Web Token
- Nodemailer
- Express Validator

## Variables de entorno

Copiá `.env.example` como `.env` y completá los valores en tu entorno local. Nunca publiques el archivo `.env` ni credenciales reales.

```env
DB_URL=
PORT=3000
ADMINKEY=
CLAVESECRETA=
EMAIL_USER=
EMAIL_APP_PASSWORD=
```

## Instalación

```bash
git clone https://github.com/Antonellavve/ProyectoFinalBack.git
cd ProyectoFinalBack
npm install
npx ts-node app.ts
```

## Endpoints principales

| Método | Ruta | Descripción |
| --- | --- | --- |
| `POST` | `/auth/register` | Registrar un usuario |
| `POST` | `/auth/login` | Iniciar sesión |
| `PATCH` | `/auth/verify` | Verificar la cuenta |
| `GET` | `/products` | Listar productos |
| `GET` | `/products/:id` | Consultar un producto |
| `POST` | `/products` | Crear un producto |
| `PUT/PATCH` | `/products/:id` | Actualizar un producto |
| `DELETE` | `/products/:id` | Eliminar un producto |
| `GET` | `/orders` | Consultar pedidos del usuario |
| `POST` | `/orders` | Crear un pedido |
| `POST` | `/category` | Crear una categoría |

## Frontend

La interfaz que consume esta API está disponible en [React](https://github.com/Antonellavve/React).


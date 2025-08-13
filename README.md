# 🚀 Challenge Server

Un servidor Node.js robusto y moderno construido con TypeScript, Express y MongoDB para el proyecto Challenge. Este servidor incluye autenticación JWT, WebSockets en tiempo real, documentación API con Swagger, y está completamente containerizado con Docker.

## ✨ Características

- **🔄 TypeScript**: Código completamente tipado para mayor robustez
- **🚀 Express.js**: Framework web rápido y minimalista
- **🗄️ MongoDB**: Base de datos NoSQL con Mongoose ODM
- **🔐 Autenticación JWT**: Sistema seguro de autenticación
- **🛡️ Seguridad**: Helmet, CORS, sanitización de MongoDB
- **📚 Swagger**: Documentación automática de la API
- **🧪 Testing**: Suite de pruebas con Jest
- **🐳 Docker**: Containerización completa para desarrollo y producción
- **🔑 Validación**: Validación de datos con express-validator

## 🏗️ Arquitectura del Proyecto

```
src/
├── app.ts              # Punto de entrada principal
├── config/             # Configuraciones y variables de entorno
├── controllers/        # Acceso y gestion de solicitudes http
├── docs/              # Documentación Swagger
├── libs/              # Librerías y utilidades
├── middlewares/       # Middlewares personalizados
├── models/            # Modelos de MongoDB
├── routes/            # Definición de rutas API
├── services/          # Lógica de negocio
├── types/             # Definiciones de tipos TypeScript
└── utils/             # Utilidades generales
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 22.17.1 o superior
- Docker y Docker Compose
- MongoDB (opcional si usas Docker)

### Opción 1: Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd challenge-server
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

### Opción 2: Con Docker (Recomendado)

1. **Preparar redes Docker**
   ```bash
   chmod +x prepare.sh
   ./prepare.sh
   ```
2. **Para reconstruir la imagen**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

3. **Construir y ejecutar con Docker Compose**
   ```bash
   docker-compose up -d
   ```

## 🔧 Scripts Disponibles

- `npm start` - Ejecutar en producción
- `npm run dev` - Ejecutar en modo desarrollo con hot-reload
- `npm run build` - Compilar TypeScript a JavaScript
- `npm run test` - Ejecutar suite de pruebas

## 🌐 Endpoints de la API

La API está disponible en `/api` y incluye las siguientes rutas:

- **Users** (`/api/users`) - Gestión de usuarios y autenticación
- **Bookings** (`/api/booking`) - Sistema de reservas
- **Occurrences** (`/api/occurrences`) - Gestión de eventos

### Documentación Swagger

La documentación completa de la API está disponible en:
```
http://localhost:80/api/swagger-docs
```

## 🔐 Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `MONGO_URI` | URI de conexión a MongoDB | `mongodb://localhost:27017/CHALLENGE` |
| `JWT_SECRET` | Clave secreta para JWT, para crear usuarios sin tener cuenta de usuario (clientes web) | `DHMn/NH7qv4H6zxgiFOB` |
| `BCRYPT_SALT_ROUNDS` | Rondas de salt para bcrypt | `10` |
| `APIKEY` | Clave API para autenticación | Requerida |

## 🐳 Docker

### Construir imagen

Considera variables de entorno.

```bash
docker build -t challenge-server:latest .
```

### Ejecutar contenedor
```bash
docker run -p 80:80 challenge-server:latest
```

### Redes Docker
El proyecto utiliza redes Docker personalizadas:
- `db_db_challenge` - Red para la base de datos
- `db_challenge` - Red interna de la base de datos
- `front_front_challenge` - Red para el frontend
- `front_challenge` - Red interna del frontend

## 🧪 Testing

Ejecutar las pruebas:
```bash
npm run test
```

Las pruebas están configuradas con Jest y se ejecutan en modo secuencial (`--runInBand`).

## 📁 Estructura de Archivos

- **`dockerfile`** - Configuración multi-stage para Docker
- **`docker-compose.yml`** - Orquestación de servicios
- **`prepare.sh`** - Script para crear redes Docker
- **`deploy.sh`** - Script para construir y taggear imágenes
- **`tsconfig.json`** - Configuración de TypeScript
- **`jest.config.js`** - Configuración de Jest

## 🔒 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Control de acceso entre orígenes
- **MongoDB Sanitize**: Prevención de inyección NoSQL
- **JWT**: Autenticación stateless segura
- **Bcrypt**: Hashing seguro de contraseñas


## 🚀 Despliegue

### Producción
```bash
# Construir imagen de producción
./deploy.sh

# Ejecutar con Docker Compose
docker-compose -f docker-compose.yml up -d
```

### Desarrollo
```bash
# Ejecutar en modo desarrollo
npm run dev

# O con Docker
docker-compose up -d
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia ISC.

## 🆘 Soporte

Si tienes alguna pregunta o necesitas ayuda, por favor:

1. Revisa la documentación de la API en `/api/swagger-docs`
2. Verifica los logs del servidor
3. Revisa la configuración de Docker y variables de entorno

---

**¡Disfruta desarrollando con Challenge Server! 🎉**

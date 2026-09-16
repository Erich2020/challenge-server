# 📚 Guía de configuración de GitHub Actions

## 🔑 Variables necesarias en GitHub

Ve a: **Settings > Actions > General > Variables**

Agrega las siguientes variables:

### Variables de Registry

```
REGISTRY=gitlab.com
IMAGE_NAME=api-challenge
GITLAB_REGISTRY_USERNAME=tu_usuario
GITLAB_REGISTRY_PASSWORD=tu_pat_o_password
```

### Variables de Entorno (Opcionales)

```
VERSION=latest
BCRYPT_SALT_ROUNDS=10
```

## 📝 Cómo obtener GITLAB_REGISTRY_PASSWORD

1. Ve a GitLab > Settings > Access Tokens
2. Crea un nuevo token con permisos de `read_registry` y `write_registry`
3. Copia el token y pégalo en la variable `GITLAB_REGISTRY_PASSWORD`

## 🔄 Flujo de trabajo

1. **Push a main branch** → GitHub Actions builda y pusha la imagen
2. **GitLab CI detecta** la imagen nueva
3. **Deployment manual** desde GitLab CI

## 🐛 Solución de problemas

### Error: "Username and password required"

**Causa:** Las variables de autenticación no están configuradas.

**Solución:**
- Verifica que `GITLAB_REGISTRY_USERNAME` y `GITLAB_REGISTRY_PASSWORD` estén configuradas en GitHub Actions
- Asegúrate de usar el token correcto con permisos de registry

### Error: "Image not found"

**Causa:** La imagen no fue subida correctamente.

**Solución:**
- Verifica que la autenticación funcione primero
- Revisa los logs del workflow en GitHub Actions

### Error: "docker: not found"

**Causa:** Docker no está instalado en el runner.

**Solución:**
- Instala Docker en el runner: `actions/setup-docker@v3`

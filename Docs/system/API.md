# 📡 API Reference

> Documentación de los endpoints de la API REST de BandSync.

---

## 🔗 Base URL

```
Development: http://localhost:8000/api/
Production:  TBD
```

---

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens) para autenticación.

### Obtener Token
```http
POST /api/auth/login/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta:**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1..."
}
```

### Usar Token
```http
GET /api/songs/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1...
```

### Refrescar Token
```http
POST /api/auth/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1..."
}
```

---

## 👥 Users

### Registro
```http
POST /api/users/register/
```
| Campo | Tipo | Requerido |
|-------|------|-----------|
| email | string | ✅ |
| password | string | ✅ |
| first_name | string | ❌ |
| last_name | string | ❌ |

### Perfil Actual
```http
GET /api/users/me/
Authorization: Bearer <token>
```

### Listar Usuarios
```http
GET /api/users/
Authorization: Bearer <token>
```

---

## 🎵 Repertoire (Songs)

### Listar Canciones
```http
GET /api/repertoire/songs/
Authorization: Bearer <token>
```

**Query Parameters:**
| Param | Tipo | Descripción |
|-------|------|-------------|
| search | string | Buscar por título/artista |
| category | int | Filtrar por categoría ID |
| ordering | string | Ordenar por campo |

### Crear Canción
```http
POST /api/repertoire/songs/
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Bohemian Rhapsody",
  "artist": "Queen",
  "duration": "5:55",
  "key": "Bb",
  "tempo": 72,
  "category": 1,
  "notes": "Intro piano solo"
}
```

### Obtener Canción
```http
GET /api/repertoire/songs/{id}/
Authorization: Bearer <token>
```

### Actualizar Canción
```http
PUT /api/repertoire/songs/{id}/
Authorization: Bearer <token>
```

### Eliminar Canción
```http
DELETE /api/repertoire/songs/{id}/
Authorization: Bearer <token>
```

---

## 📅 Schedule (Events)

### Listar Eventos
```http
GET /api/schedule/events/
Authorization: Bearer <token>
```

**Query Parameters:**
| Param | Tipo | Descripción |
|-------|------|-------------|
| date_from | date | Desde fecha (YYYY-MM-DD) |
| date_to | date | Hasta fecha (YYYY-MM-DD) |
| type | string | Tipo de evento |

### Crear Evento
```http
POST /api/schedule/events/
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Ensayo semanal",
  "date": "2026-02-01",
  "time": "18:00",
  "location": "Local de ensayo",
  "type": "rehearsal",
  "notes": "Repasar setlist nuevo"
}
```

### Obtener Evento
```http
GET /api/schedule/events/{id}/
Authorization: Bearer <token>
```

### Actualizar Evento
```http
PUT /api/schedule/events/{id}/
Authorization: Bearer <token>
```

### Eliminar Evento
```http
DELETE /api/schedule/events/{id}/
Authorization: Bearer <token>
```

---

## 📊 Códigos de Respuesta

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Eliminado exitosamente |
| 400 | Bad Request - Error de validación |
| 401 | Unauthorized - Token inválido/expirado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no existe |
| 500 | Server Error - Error interno |

---

## 🔄 Paginación

Las listas usan paginación por defecto:

```json
{
  "count": 100,
  "next": "http://localhost:8000/api/songs/?page=2",
  "previous": null,
  "results": [...]
}
```

**Query Parameters:**
| Param | Default | Descripción |
|-------|---------|-------------|
| page | 1 | Número de página |
| page_size | 20 | Items por página (max 100) |

---

## ⚠️ Errores

Formato estándar de error:
```json
{
  "detail": "Mensaje de error legible",
  "code": "error_code",
  "errors": {
    "field_name": ["Error específico del campo"]
  }
}
```

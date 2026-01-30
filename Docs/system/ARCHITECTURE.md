# 🏗️ Arquitectura del Sistema

> Visión técnica de la arquitectura de BandSync.

---

## 📊 Diagrama General

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    React + TypeScript                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │Dashboard│  │  Songs  │  │Schedule │  │ Members │    │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP/REST
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                  Django REST Framework                    │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │  Users  │  │Repertoire│ │ Schedule │  │   AI    │    │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
└──────────────┬──────────────────────────────┬───────────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│       DATABASE           │    │      EXTERNAL APIs       │
│  ┌────────────────────┐  │    │  ┌────────────────────┐  │
│  │  SQLite/PostgreSQL │  │    │  │   Google Gemini    │  │
│  └────────────────────┘  │    │  └────────────────────┘  │
└──────────────────────────┘    └──────────────────────────┘
```

---

## 🧩 Componentes Principales

### Frontend (React)

| Módulo | Responsabilidad |
|--------|-----------------|
| `features/dashboard/` | Vista principal, resumen |
| `features/songs/` | Gestión de repertorio |
| `features/calendar/` | Eventos y calendario |
| `features/members/` | Gestión de miembros |
| `features/ai/` | Integración con AI |
| `services/` | Comunicación con API |

### Backend (Django)

| App | Responsabilidad |
|-----|-----------------|
| `config/` | Configuración global |
| `users/` | Autenticación, roles, permisos |
| `repertoire/` | Canciones, setlists, categorías |
| `schedule/` | Eventos, ensayos, calendario |

---

## 🔄 Flujo de Datos

### Autenticación
```
Usuario → Login Form → POST /api/auth/login/
                              ↓
                        JWT Token generado
                              ↓
                        Almacenado en localStorage
                              ↓
                        Incluido en headers de requests
```

### CRUD de Canciones
```
Usuario → Acción en UI → Service API Call
                              ↓
                        Django REST View
                              ↓
                        Serializer (validación)
                              ↓
                        Model (ORM)
                              ↓
                        Database
```

---

## 🗄️ Modelo de Datos (Resumen)

```
User ─────────┬───────── Band (futuro)
              │
              ├── Song ─────── Category
              │
              └── Event ────── EventType
```

Ver [DATABASE.md](DATABASE.md) para detalle completo.

---

## 🔒 Seguridad

| Capa | Mecanismo |
|------|-----------|
| Autenticación | JWT (Simple JWT) |
| Autorización | Django Permissions + Roles |
| API | CORS configurado |
| Passwords | Hashing con Django (PBKDF2) |

---

## 📡 Integraciones Externas

| Servicio | Uso | Endpoint |
|----------|-----|----------|
| Google Gemini | Sugerencias AI | `generativelanguage.googleapis.com` |

---

## 📐 Decisiones de Arquitectura

Ver [architecture/decisions/](../architecture/decisions/) para ADRs completos.

| ADR | Decisión |
|-----|----------|
| - | Pendiente de documentar |

---

## 🔮 Evolución Futura

- [ ] Migración a PostgreSQL en producción
- [ ] Implementación de WebSockets para tiempo real
- [ ] Microservicios para AI (si escala)
- [ ] CDN para assets estáticos

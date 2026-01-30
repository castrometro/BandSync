# 🎵 BandSync - System Overview

> **BandSync** es una aplicación para gestión de bandas musicales que incluye repertorio, calendario de eventos y gestión de miembros.

---

## 📋 Descripción

BandSync permite a bandas y grupos musicales:
- 🎸 Gestionar su repertorio de canciones
- 📅 Organizar eventos y ensayos
- 👥 Administrar miembros y roles
- 🤖 Obtener sugerencias inteligentes con IA

---

## 🏗️ Stack Tecnológico

### Backend
- **Framework**: Django 4.x + Django REST Framework
- **Base de Datos**: SQLite (desarrollo) / PostgreSQL (producción)
- **Autenticación**: JWT (Simple JWT)

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **Estado**: React Context / Hooks

### AI Services
- **Provider**: Google Gemini API
- **Uso**: Sugerencias de setlists, análisis de repertorio

### Infraestructura
- **Containerización**: Docker + Docker Compose
- **CI/CD**: GitHub Actions (pendiente)

---

## 📁 Estructura del Proyecto

```
BandSync/
├── backend/              # Django API
│   ├── config/           # Configuración Django
│   ├── users/            # Gestión de usuarios
│   ├── repertoire/       # Canciones y setlists
│   └── schedule/         # Eventos y calendario
│
├── frontend/             # React App
│   ├── components/       # Componentes reutilizables
│   ├── features/         # Módulos por funcionalidad
│   └── services/         # Servicios y APIs
│
├── docs/                 # Documentación
│   ├── system/           # Docs del sistema
│   └── [departamentos]/  # Docs por área
│
└── docker-compose.yml    # Orquestación de servicios
```

---

## 🔗 Enlaces de Documentación

- [Guía de Inicio Rápido](GETTING-STARTED.md)
- [Arquitectura](ARCHITECTURE.md)
- [API Reference](API.md)
- [Base de Datos](DATABASE.md)
- [Despliegue](DEPLOYMENT.md)
- [Changelog](CHANGELOG.md)

---

## 📊 Estado del Proyecto

Ver [Dashboard](../DASHBOARD.md) para el estado actual del proyecto.

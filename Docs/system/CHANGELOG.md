# 📝 Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [Unreleased]

### Added
- Estructura de documentación por departamentos
- Dashboard centralizado del proyecto
- Agentes de desarrollo (SE Team) instalados

### Changed
- (ninguno)

### Deprecated
- (ninguno)

### Removed
- (ninguno)

### Fixed
- (ninguno)

### Security
- (ninguno)

---

## [0.1.0] - 2026-01-30

### Added
- Setup inicial del proyecto
- Backend Django con Django REST Framework
- Frontend React con TypeScript y Vite
- Modelos: User, Role, Song, Category, Event
- Autenticación JWT
- Docker Compose para desarrollo
- Integración básica con Google Gemini API

---

## Plantilla para nuevas versiones

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- Nuevas funcionalidades

### Changed
- Cambios en funcionalidades existentes

### Deprecated
- Funcionalidades que serán eliminadas en futuras versiones

### Removed
- Funcionalidades eliminadas

### Fixed
- Corrección de bugs

### Security
- Correcciones de vulnerabilidades
```

---

## Versionado

Usamos [SemVer](http://semver.org/) para versionado:

- **MAJOR** (X.0.0): Cambios incompatibles con versiones anteriores
- **MINOR** (0.X.0): Nueva funcionalidad compatible hacia atrás
- **PATCH** (0.0.X): Correcciones de bugs compatibles hacia atrás

### Versiones Pre-release
- `alpha`: Funcionalidad incompleta, puede cambiar
- `beta`: Funcionalidad completa, en testing
- `rc`: Release candidate, listo para producción

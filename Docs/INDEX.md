# 📚 BandSync - Índice de Documentación

> Navegación centralizada de toda la documentación del proyecto.

---

## 🎯 Acceso Rápido

- **[Dashboard del Proyecto](DASHBOARD.md)** - Estado actual y métricas
- **[Guía de Inicio Rápido](system/GETTING-STARTED.md)** - Comenzar a desarrollar
- **[Arquitectura](system/ARCHITECTURE.md)** - Visión técnica general

---

## 📘 Documentación del Sistema

| Documento | Descripción |
|-----------|-------------|
| [README](system/README.md) | Overview general del proyecto |
| [Getting Started](system/GETTING-STARTED.md) | Guía de inicio para desarrolladores |
| [Architecture](system/ARCHITECTURE.md) | Arquitectura técnica del sistema |
| [API Reference](system/API.md) | Documentación de endpoints |
| [Database](system/DATABASE.md) | Esquema y modelos de datos |
| [Deployment](system/DEPLOYMENT.md) | Guía de despliegue |
| [Changelog](system/CHANGELOG.md) | Historial de cambios |

---

## 🏢 Documentación por Departamento

### 📦 Product Management
> Requisitos, roadmap y métricas de producto

| Carpeta | Contenido |
|---------|-----------|
| [product/requirements/](product/requirements/) | PRDs y especificaciones |
| [product/roadmap/](product/roadmap/) | Planificación y milestones |
| [product/analytics/](product/analytics/) | Métricas y KPIs |

### 🎨 UX/UI Design
> Investigación de usuarios, journeys y flujos

| Carpeta | Contenido |
|---------|-----------|
| [ux/research/](ux/research/) | JTBD, personas, entrevistas |
| [ux/journeys/](ux/journeys/) | User journey maps |
| [ux/flows/](ux/flows/) | Especificaciones para diseño |

### 🏛️ Architecture
> Decisiones técnicas y diagramas

| Carpeta | Contenido |
|---------|-----------|
| [architecture/decisions/](architecture/decisions/) | ADRs (Architecture Decision Records) |
| [architecture/diagrams/](architecture/diagrams/) | Diagramas C4, secuencia, etc. |
| [architecture/reviews/](architecture/reviews/) | Revisiones de arquitectura |

### 🔒 Security
> Auditorías, políticas y revisiones de seguridad

| Carpeta | Contenido |
|---------|-----------|
| [security/audits/](security/audits/) | Reportes de auditoría |
| [security/reviews/](security/reviews/) | Code reviews de seguridad |
| [security/policies/](security/policies/) | Políticas y estándares |

### ⚙️ DevOps
> Operaciones, incidentes y CI/CD

| Carpeta | Contenido |
|---------|-----------|
| [devops/runbooks/](devops/runbooks/) | Guías operacionales |
| [devops/incidents/](devops/incidents/) | Post-mortems |
| [devops/pipelines/](devops/pipelines/) | Documentación CI/CD |

### 📝 Technical Writing
> Documentación técnica y guías

| Carpeta | Contenido |
|---------|-----------|
| [technical-writing/api/](technical-writing/api/) | Documentación de APIs |
| [technical-writing/guides/](technical-writing/guides/) | Guías de usuario |
| [technical-writing/tutorials/](technical-writing/tutorials/) | Tutoriales paso a paso |

### 🤖 Responsible AI
> Ética, accesibilidad y compliance

| Carpeta | Contenido |
|---------|-----------|
| [responsible-ai/assessments/](responsible-ai/assessments/) | Evaluaciones de bias/ética |
| [responsible-ai/compliance/](responsible-ai/compliance/) | WCAG, GDPR, etc. |
| [responsible-ai/decisions/](responsible-ai/decisions/) | RAI-ADRs |

---

## 🏷️ Convenciones de Nombrado

### Archivos
- `UPPERCASE.md` - Documentos principales del sistema
- `lowercase-with-dashes.md` - Documentos específicos
- `ADR-001-titulo.md` - Architecture Decision Records
- `RAI-ADR-001-titulo.md` - Responsible AI Decision Records

### Prefijos de Estado
- `[DRAFT]` - Borrador, en revisión
- `[APPROVED]` - Aprobado, vigente
- `[DEPRECATED]` - Obsoleto, ver reemplazo

---

## 🔄 Mantenimiento

| Documento | Frecuencia | Responsable |
|-----------|------------|-------------|
| DASHBOARD.md | Continuo | Todos |
| INDEX.md | Mensual | Tech Writer |
| CHANGELOG.md | Por release | DevOps |
| ADRs | Por decisión | Architect |

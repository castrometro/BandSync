# ⚙️ DevOps

> Operaciones, runbooks, gestión de incidentes y CI/CD.

**Agente asociado**: `@SE: DevOps/CI`

---

## 📁 Estructura

```
devops/
├── README.md           # Este archivo
├── runbooks/           # Guías operacionales
├── incidents/          # Post-mortems
└── pipelines/          # Documentación CI/CD
```

---

## 🎯 Responsabilidades

- Mantener pipelines de CI/CD
- Documentar runbooks operacionales
- Gestionar incidentes y post-mortems
- Monitoreo y alertas
- Gestión de infraestructura

---

## 📋 Plantillas

### Runbook
Ubicación: `runbooks/[nombre]-runbook.md`

Formato:
```markdown
# Runbook: [Nombre del Proceso]

## Propósito
[Qué resuelve este runbook]

## Pre-requisitos
[Accesos, herramientas necesarias]

## Pasos
1. [Paso detallado]
2. [Paso detallado]

## Rollback
[Cómo revertir si falla]

## Contactos
[A quién escalar]
```

### Post-Mortem
Ubicación: `incidents/[date]-[incident-name]-postmortem.md`

### Pipeline Doc
Ubicación: `pipelines/[pipeline-name].md`

---

## 📊 Métricas DORA

| Métrica | Valor Actual | Objetivo |
|---------|--------------|----------|
| Deployment Frequency | - | Daily |
| Lead Time for Changes | - | < 1 día |
| Change Failure Rate | - | < 15% |
| Time to Restore | - | < 1 hora |

---

## 🔗 Enlaces Útiles

- [Dashboard del Proyecto](../DASHBOARD.md)
- [Deployment Guide](../system/DEPLOYMENT.md)

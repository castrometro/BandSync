# 🏛️ Architecture

> Decisiones de arquitectura, diagramas y revisiones técnicas.

**Agente asociado**: `@SE: Architect`

---

## 📁 Estructura

```
architecture/
├── README.md           # Este archivo
├── decisions/          # ADRs (Architecture Decision Records)
├── diagrams/           # Diagramas C4, secuencia, etc.
└── reviews/            # Revisiones de arquitectura
```

---

## 🎯 Responsabilidades

- Documentar decisiones de arquitectura (ADRs)
- Crear y mantener diagramas del sistema
- Revisar propuestas de arquitectura
- Aplicar Well-Architected Framework
- Evaluar escalabilidad y rendimiento

---

## 📋 Plantillas

### ADR (Architecture Decision Record)
Ubicación: `decisions/ADR-[number]-[title].md`

Formato:
```markdown
# ADR-001: Título de la Decisión

**Estado**: [Proposed | Accepted | Deprecated | Superseded]
**Fecha**: YYYY-MM-DD

## Contexto
[Descripción del problema]

## Decisión
[La decisión tomada]

## Consecuencias
[Impacto de la decisión]
```

### Diagrama
Ubicación: `diagrams/[nombre]-diagram.md` o `.png`

### Review
Ubicación: `reviews/[date]-[component]-review.md`

---

## 📊 ADRs Activos

| ADR | Título | Estado | Fecha |
|-----|--------|--------|-------|
| - | Pendiente de documentar | - | - |

---

## 🔗 Enlaces Útiles

- [Dashboard del Proyecto](../DASHBOARD.md)
- [Arquitectura del Sistema](../system/ARCHITECTURE.md)

# 🔒 Security

> Auditorías de seguridad, revisiones de código y políticas.

**Agente asociado**: `@SE: Security`

---

## 📁 Estructura

```
security/
├── README.md           # Este archivo
├── audits/             # Reportes de auditoría
├── reviews/            # Code reviews de seguridad
└── policies/           # Políticas y estándares
```

---

## 🎯 Responsabilidades

- Revisiones de seguridad de código
- Auditorías de vulnerabilidades
- Documentar políticas de seguridad
- Aplicar OWASP Top 10
- Seguridad de LLMs (OWASP LLM Top 10)
- Implementar Zero Trust

---

## 📋 Plantillas

### Security Audit
Ubicación: `audits/[date]-[scope]-audit.md`

### Code Review (Security)
Ubicación: `reviews/[date]-[component]-security-review.md`

### Security Policy
Ubicación: `policies/[policy-name].md`

---

## 🛡️ Estándares Aplicados

- OWASP Top 10 (Web)
- OWASP LLM Top 10 (AI)
- Zero Trust Architecture
- GDPR (si aplica)

---

## 🚨 Proceso de Reporte de Vulnerabilidades

1. Identificar vulnerabilidad
2. Documentar en `audits/`
3. Clasificar severidad (Critical/High/Medium/Low)
4. Crear issue con label `security`
5. Remediar y verificar

---

## 🔗 Enlaces Útiles

- [Dashboard del Proyecto](../DASHBOARD.md)
- [Responsible AI](../responsible-ai/)

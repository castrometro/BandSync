# 🚀 Guía de Despliegue

> Instrucciones para desplegar BandSync en diferentes entornos.

---

## 🐳 Docker (Recomendado)

### Desarrollo Local
```bash
# Construir y levantar servicios
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Limpiar todo (incluyendo volúmenes)
docker-compose down -v
```

### Producción
```bash
# Usar archivo de producción
docker-compose -f docker-compose.prod.yml up -d
```

---

## ⚙️ Variables de Entorno

### Backend (Producción)
```env
# Django
DEBUG=False
SECRET_KEY=<generar-key-segura>
ALLOWED_HOSTS=tudominio.com,www.tudominio.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/bandsync

# CORS
CORS_ALLOWED_ORIGINS=https://tudominio.com

# Security
CSRF_TRUSTED_ORIGINS=https://tudominio.com
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

### Frontend (Producción)
```env
VITE_API_URL=https://api.tudominio.com/api
VITE_GEMINI_API_KEY=<tu-api-key>
```

---

## 📋 Checklist Pre-Despliegue

### Seguridad
- [ ] `DEBUG=False`
- [ ] `SECRET_KEY` único y seguro
- [ ] HTTPS configurado
- [ ] CORS restringido a dominios permitidos
- [ ] Cookies seguras habilitadas

### Base de Datos
- [ ] PostgreSQL configurado (no SQLite)
- [ ] Backups automatizados
- [ ] Migraciones aplicadas
- [ ] Índices creados

### Performance
- [ ] Assets estáticos servidos desde CDN/Nginx
- [ ] Gzip habilitado
- [ ] Caching configurado
- [ ] Logs configurados

### Monitoreo
- [ ] Health checks configurados
- [ ] Logging centralizado
- [ ] Alertas configuradas
- [ ] Métricas de rendimiento

---

## 🌐 Opciones de Hosting

### Backend (Django)

| Plataforma | Pros | Contras |
|------------|------|---------|
| Railway | Simple, auto-deploy | Precio escala |
| Render | Free tier disponible | Cold starts |
| DigitalOcean App | Predecible | Config manual |
| AWS ECS | Escalable | Complejidad |
| Heroku | Familiar | Precio |

### Frontend (React)

| Plataforma | Pros | Contras |
|------------|------|---------|
| Vercel | Óptimo para React | - |
| Netlify | CI/CD integrado | - |
| Cloudflare Pages | Rápido, gratis | - |
| AWS S3 + CloudFront | Control total | Setup complejo |

### Base de Datos

| Plataforma | Pros | Contras |
|------------|------|---------|
| Supabase | PostgreSQL gratis | Límites free tier |
| Railway | Simple | Precio |
| PlanetScale | MySQL escalable | No PostgreSQL |
| AWS RDS | Robusto | Costo |

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Ejemplo)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: |
          cd backend
          pip install -r requirements.txt
          python manage.py test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: echo "Deploy steps here"
```

---

## 📊 Health Checks

### Backend
```python
# /api/health/
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2026-01-30T12:00:00Z"
}
```

### Monitoreo Recomendado
- **Uptime**: UptimeRobot, Pingdom
- **APM**: Sentry, New Relic
- **Logs**: Papertrail, Logtail

---

## 🔙 Rollback

```bash
# Docker
docker-compose down
docker-compose -f docker-compose.yml up -d --build <previous-tag>

# Git-based
git revert HEAD
git push origin main
```

---

## 📝 Post-Despliegue

1. [ ] Verificar health checks
2. [ ] Probar flujos críticos
3. [ ] Verificar logs por errores
4. [ ] Notificar al equipo
5. [ ] Actualizar CHANGELOG

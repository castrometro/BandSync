# 🚀 Guía de Inicio Rápido

> Cómo configurar el entorno de desarrollo de BandSync.

---

## 📋 Prerrequisitos

- **Python** 3.10+
- **Node.js** 18+
- **Docker** y Docker Compose (opcional)
- **Git**

---

## ⚡ Inicio Rápido con Docker

```bash
# Clonar el repositorio
git clone <repo-url>
cd BandSync

# Levantar todos los servicios
docker-compose up -d

# La aplicación estará disponible en:
# - Frontend: http://localhost:5173
# - Backend API: http://localhost:8000
```

---

## 🔧 Configuración Manual

### Backend (Django)

```bash
# Navegar al directorio
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Aplicar migraciones
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser

# Cargar roles iniciales
python manage.py seed_roles

# Iniciar servidor de desarrollo
python manage.py runserver
```

### Frontend (React)

```bash
# Navegar al directorio
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

---

## 🔑 Variables de Entorno

### Backend (`backend/.env`)
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000/api
VITE_GEMINI_API_KEY=your-gemini-key-here
```

---

## ✅ Verificar Instalación

### Backend
```bash
# El servidor debería responder en:
curl http://localhost:8000/api/

# Admin disponible en:
# http://localhost:8000/admin/
```

### Frontend
```bash
# La aplicación debería cargar en:
# http://localhost:5173/
```

---

## 🧪 Ejecutar Tests

```bash
# Backend
cd backend
python manage.py test

# Frontend
cd frontend
npm test
```

---

## 📚 Siguiente Paso

- [Arquitectura del Sistema](ARCHITECTURE.md) - Entender cómo funciona
- [API Reference](API.md) - Explorar los endpoints
- [Dashboard](../DASHBOARD.md) - Ver estado del proyecto

# 🗄️ Base de Datos

> Esquema y modelos de datos de BandSync.

---

## 📊 Diagrama ER

```
┌─────────────────┐       ┌─────────────────┐
│      User       │       │      Role       │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ email           │──────<│ name            │
│ password        │       │ description     │
│ first_name      │       └─────────────────┘
│ last_name       │
│ role (FK)       │
│ is_active       │
│ created_at      │
└────────┬────────┘
         │
         │ created_by
         ▼
┌─────────────────┐       ┌─────────────────┐
│      Song       │       │    Category     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ title           │──────<│ name            │
│ artist          │       │ description     │
│ duration        │       └─────────────────┘
│ key             │
│ tempo           │
│ category (FK)   │
│ notes           │
│ created_by (FK) │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐
│     Event       │
├─────────────────┤
│ id (PK)         │
│ title           │
│ date            │
│ time            │
│ location        │
│ type            │
│ notes           │
│ created_by (FK) │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

---

## 📋 Modelos Detallados

### User
| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | UUID/Int | PK, Auto | Identificador único |
| email | EmailField | Unique, Not Null | Email del usuario |
| password | CharField | Not Null | Hash del password |
| first_name | CharField | Nullable | Nombre |
| last_name | CharField | Nullable | Apellido |
| role | ForeignKey | FK→Role | Rol del usuario |
| is_active | Boolean | Default True | Usuario activo |
| is_staff | Boolean | Default False | Acceso admin |
| created_at | DateTime | Auto | Fecha creación |
| updated_at | DateTime | Auto | Última modificación |

### Role
| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | Int | PK, Auto | Identificador único |
| name | CharField | Unique | Nombre del rol |
| description | TextField | Nullable | Descripción |

**Roles predefinidos:**
- `admin` - Administrador completo
- `leader` - Líder de banda
- `member` - Miembro regular
- `guest` - Invitado (solo lectura)

### Song
| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | Int | PK, Auto | Identificador único |
| title | CharField | Not Null | Título de la canción |
| artist | CharField | Not Null | Artista/Compositor |
| duration | DurationField | Nullable | Duración (MM:SS) |
| key | CharField | Nullable | Tonalidad (C, D, Em, etc.) |
| tempo | IntegerField | Nullable | BPM |
| category | ForeignKey | FK→Category | Categoría/Género |
| notes | TextField | Nullable | Notas adicionales |
| lyrics | TextField | Nullable | Letra de la canción |
| created_by | ForeignKey | FK→User | Creador |
| created_at | DateTime | Auto | Fecha creación |
| updated_at | DateTime | Auto | Última modificación |

### Category
| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | Int | PK, Auto | Identificador único |
| name | CharField | Unique | Nombre categoría |
| description | TextField | Nullable | Descripción |
| color | CharField | Nullable | Color hex (#FF5733) |

### Event
| Campo | Tipo | Constraints | Descripción |
|-------|------|-------------|-------------|
| id | Int | PK, Auto | Identificador único |
| title | CharField | Not Null | Título del evento |
| date | DateField | Not Null | Fecha del evento |
| time | TimeField | Nullable | Hora de inicio |
| end_time | TimeField | Nullable | Hora de fin |
| location | CharField | Nullable | Ubicación |
| type | CharField | Not Null | Tipo de evento |
| notes | TextField | Nullable | Notas adicionales |
| created_by | ForeignKey | FK→User | Creador |
| created_at | DateTime | Auto | Fecha creación |
| updated_at | DateTime | Auto | Última modificación |

**Tipos de evento:**
- `rehearsal` - Ensayo
- `gig` - Concierto/Actuación
- `meeting` - Reunión
- `recording` - Grabación
- `other` - Otro

---

## 🔧 Migraciones

```bash
# Crear nuevas migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Ver migraciones pendientes
python manage.py showmigrations

# Revertir migración específica
python manage.py migrate app_name 0001
```

---

## 📈 Índices Recomendados

| Tabla | Campos | Tipo | Razón |
|-------|--------|------|-------|
| Song | title | B-Tree | Búsquedas por título |
| Song | artist | B-Tree | Búsquedas por artista |
| Song | category_id | B-Tree | Filtros por categoría |
| Event | date | B-Tree | Filtros por fecha |
| User | email | Unique | Login |

---

## 🔄 Datos Semilla

```bash
# Cargar roles iniciales
python manage.py seed_roles

# Crear datos de prueba (si existe)
python manage.py seed_demo_data
```

# Bandeja de Tareas

## Instalación

### Requisitos previos
- Node.js 18+
- pnpm 9+

### Pasos

##bash

### 1. Clonar el repositorio
git clone https://github.com/SrFlesky/bandeja-tareas

cd bandeja-tareas

### 2. Instalar dependencias
pnpm install

### 3. Levantar el entorno de desarrollo
pnpm dev

Por defecto Vite expone el servidor de desarrollo en `http://localhost:5173`.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Entorno de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm preview` | Sirve el build de producción localmente |

## Arquitectura

El código vive en `src/` organizado por feature:

- `features/tasks/`: toda la lógica de la bandeja de tareas.
  - `components/`: un componente por carpeta (`TaskCard`, `TaskDetail`, `TaskEditModal`, `FilterBar`, `SearchBar`, `SortButton`, `Pagination`, `ActivityTimeline`).
  - `hooks/`: un hook por responsabilidad (`useTasks`, `useTaskSearch`, `useTaskFilter`, `useTaskSort`, `usePagination`, `useSelectedTask`, `useTaskEditor`).
  - `services/`: `taskService.js`, capa mock que simula un backend leyendo/escribiendo sobre un array en memoria (`src/data/mockTasks.json`).
  - `store/`: `useTaskStore.js`, store de Zustand que mantiene `tasks`, `loading` y `error`, y expone `loadTasks`/`editTask`.
  - `config/`: mapeos de color por estado, prioridad y proceso, y la configuración de los filtros disponibles (`filterConfig.js`).
  - `utils/`: funciones puras de búsqueda, filtrado, orden, paginación y formateo de fechas.
- `features/pages/TasksPage.jsx`: orquesta la página combinando todos los hooks y componentes anteriores.
- `shared/`: lo genuinamente transversal a features (`NavBar`, `TopBar`, `BottomNav`, utilidad `cn` para clases).
- `constants/`: enums de estado, prioridad y proceso de una tarea.

**Flujo de datos**: `taskService` expone `fetchTasks`/`updateTask` sobre los datos mock → `useTaskStore` llama a esas funciones y guarda el resultado en el store de Zustand → los hooks de la feature (`useTasks`, `useTaskSearch`, `useTaskFilter`, `useTaskSort`, `usePagination`, `useTaskEditor`) leen del store y aplican búsqueda/filtro/orden/paginación en memoria sobre el array de tareas → `TasksPage` compone esos resultados y los pasa a los componentes de presentación.

Búsqueda, filtros, orden y página actual no se guardan en estado local: viven en los query params de la URL a través de `useSearchParams` de React Router. Esto hace que el estado de la bandeja sea compartible por URL y sobreviva a refrescos de página.

La interacción con una tarea se resuelve en tres vistas independientes: `TaskCard` (fila de la bandeja, lectura rápida), `TaskDetail` (drawer lateral de solo lectura con más contexto) y `TaskEditModal` (modal de edición explícita).

## Decisiones técnicas

Detalle completo en [Decisions.md](Decisions.md).

1. **Paginación client-side sobre un fetch único**: se asume que un backend real ya filtraría por usuario, dejando un volumen manejable para cargar de una vez y paginar/filtrar/ordenar en memoria, evitando latencia de red en cada interacción y quedando la puerta abierta a mover esa lógica a `taskService` si el volumen creciera.
2. **Tres vistas según el tipo de interacción con la tarea**: separar lectura rápida (`TaskCard`), detalle (`TaskDetail`) y edición (`TaskEditModal`) evita sobrecargar una única superficie con datos y controles que no siempre son relevantes, y permite que cada vista evolucione de forma independiente.
3. **Organización por feature**: con una sola feature dominante pero con muchas piezas internas, agrupar por feature (en vez de por tipo de archivo o Atomic Design) mantiene junto todo lo relacionado con tareas y deja `shared/` solo para lo genuinamente reutilizable.

## Mejoras futuras

- Persistencia real de cambios: la edición de tareas no está activa de momento, pero podría generar cambios sea en memoria, en el mockData o conectarse a una BD real.
- Migración a paginación/filtrado server-side si el volumen de tareas por usuario lo exigiera.
- Conexión del registro de actividdades con la barra de progreso: Que exista una forma en que al completarse o se realice un progreso de actividad dentro de la tarea se re defina también el progreso y que esté renderizado con un porcentaje más realista. No harcodeado en 50%.
- Poder archivar las tareas completadas, para que dejen de renderizarse en el primer fetch y solicitarse de forma independiente cuando son requeridas.
- Automatizar alertas para que acorde con la información actualizada se calculen datos como "La tarea X ya pasó su fecha límite de resolución" o "NNNN NNNNN ya cuenta con 5 tareas para esta semana", etc. Que le permitan al usuario tomar decisiones mejor informadas.

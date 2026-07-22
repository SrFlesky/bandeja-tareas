# Decisiones Técnicas

Este documento explica las decisiones relevantes tomadas durante el desarrollo, las alternativas consideradas y la justificación de cada una.

---

## 1. Stack tecnológico

### Problema

Definir las herramientas base del proyecto.

### Alternativas consideradas

- Manejo: de estado: Redux Toolkit / Context+useReducer / Zustand
- Estilos: CSS Modules / Styled Components / Tailwind para estilos
- Datos: fetch nativo / TanStack Query para datos.

### Opción elegida

- Estructura de carpetas: por feature
- Estado global: Zustand
- Routing: React Router
- Estilos: Tailwind CSS
- Datos: fetch nativo (con capa de servicios propia)
- Componentes: separación entre lógica (hooks) y presentación (componentes visuales)

### Justificación

Stack simple y suficiente para el alcance del proyecto (mock local, sin backend real), priorizando herramientas ya conocidas y evitando sobre-ingeniería. Se detalla con más profundidad a medida que se implementen las funcionalidades.

---

## 2. Estrategia de carga de datos y paginación

### Problema identificado

La aplicación debe mostrar una bandeja de tareas cuyo volumen puede escalar a miles de registros. Había que decidir cómo cargar y paginar esos datos sin sacrificar rendimiento ni la experiencia de búsqueda/filtrado "dinámica" que exige el enunciado.

### Alternativas consideradas

1. **Paginación server-side**: el cliente solicita solo la página actual (`GET /tasks?page=2&filters=...`), delegando el filtrado, orden y paginado al servidor.
2. **Virtualización con scroll infinito**: renderizar únicamente los elementos visibles en pantalla, cargando más datos a medida que el usuario baja.
3. **Fetch único al inicio + paginación client-side**: se cargan todas las tareas del usuario en una sola petición, y toda la lógica de búsqueda, filtro, orden y paginación se ejecuta en memoria sobre ese array.

### Opción elegida

Fetch único al inicio + paginación client-side, con el estado de la página reflejado en la URL (`?page=n`).

### Justificación

- El volumen real que maneja un usuario individual (su propia bandeja) no equivale al volumen total del sistema, por lo que es razonable asumir que un backend real ya filtraría por usuario antes de exponer los datos, dejando un conjunto manejable en memoria (los miles de datos).
- Con ese orden de magnitud, el cuello de botella no está en el tamaño de la respuesta de red, sino en el renderizado de la página si se muestran todos los elementos sin paginar. Esto la paginación resuelve sin necesitar peticiones adicionales por cada interacción.
- Tener los datos en memoria permite que búsqueda, filtros y orden respondan de forma instantánea, sin depender de la latencia de red en cada tecla o clic, ni de manejar condiciones de carrera entre peticiones.
- La decisión es reversible sin rediseñar la arquitectura: la capa de servicio (`taskService.js`) está aislada del resto de la app, por lo que si el volumen por usuario creciera, bastaría con modificar esa capa para enviar los parámetros de paginación/filtrado a un servidor real.

---

## 3. Separación de la interfaz en tres vistas según el tipo de interacción con el dato

### Problema identificado

Una tarea tiene datos con distintos propósitos: algunos solo necesitan **leerse rápido** al navegar la bandeja (título, estado, prioridad), otros necesitan **consultarse con más detalle** sin perder el contexto de la lista (responsable, fechas, historial de actividad), y otros necesitan **modificarse** (título, proceso, prioridad, estado, notas, nuevas entradas de actividad). Concentrar todo esto en una sola vista obliga a elegir entre una interfaz sobrecargada de información no siempre relevante, o una demasiado limitada para cubrir los tres casos de uso.

### Alternativas consideradas

1. **Una sola vista con todo visible**: la bandeja muestra cada tarea expandida con todos sus campos y controles de edición inline.
2. **Vista de lista + un único modal** que combina detalle y edición en la misma superficie.
3. **Tres vistas diferenciadas por propósito**: bandeja (lectura rápida), panel lateral/drawer (detalle de solo lectura, de acceso inmediato) y modal (edición explícita, acción deliberada).

### Opción elegida

Tres vistas diferenciadas: `TaskCard` en la bandeja, `TaskDetail` como drawer lateral, y `TaskEditModal` como modal de edición.

### Justificación

- Cada vista expone solo la información necesaria para su propósito: la bandeja prioriza densidad y escaneo rápido. El drawer prioriza contexto completo sin perder la lista de fondo. El modal aísla la edición como una acción deliberada, con foco total y sin distracciones.
- Evita el antipatrón de una tarjeta de lista sobrecargada de controles editables que rara vez se usan, o un modal insuficiente que obliga a cerrar y reabrir para ver más contexto.
- El drawer (lectura) y el modal (edición) son intencionalmente accesibles desde distintos triggers (clic en la tarjeta vs. clic en el título o en "Gestionar tarea"), reforzando para el usuario la diferencia entre "quiero ver más" y "quiero cambiar algo".
- Al ser componentes independientes, cada uno pudo evolucionar su diseño (animaciones, layout, campos) sin afectar a los otros dos, y todos comparten la misma fuente de datos a través del store, manteniéndose sincronizados automáticamente.

---

## 4. Arquitectura de carpetas por feature

### Problema identificado

Había que definir cómo organizar el código a medida que crecía: componentes, hooks, lógica de filtrado/orden/búsqueda, configuración de colores por proceso/prioridad/estado, y la capa de datos.

### Alternativas consideradas

1. **Organización por tipo**: carpetas globales `components/`, `hooks/`, `utils/` a nivel raíz, agrupando por naturaleza técnica del archivo.
2. **Atomic Design**: clasificación en átomos, moléculas, organismos y templates.
3. **Organización por feature**: cada funcionalidad contiene sus propios componentes, hooks, servicios, configuración y utilidades; `shared/` reúne solo lo genuinamente transversal.

### Opción elegida

Organización por feature, con `shared/` para lo reutilizable entre features.

### Justificación

- Con una sola feature dominante (tareas) pero con muchas piezas internas (búsqueda, filtros, orden, paginación, detalle, edición, historial de actividad), agrupar por tipo habría obligado a saltar entre carpetas lejanas para trabajar en una sola funcionalidad relacionada.
- Atomic Design habría añadido una capa de clasificación subjetiva sin aportar valor real al tamaño de este proyecto y convirtiéndose más en un contratiempo.
- La organización por feature deja explícito qué pertenece exclusivamente a la gestión de tareas y qué es genuinamente compartido (`cn`, `formatDate`, `NavBar`), evitando que utilidades específicas del dominio terminen mal ubicadas en `shared/` por comodidad.
- Facilita razonar sobre el impacto de un cambio: modificar la lógica de filtrado no tiene por qué tocar nada fuera de `features/tasks/`.
Decisiones Técnicas

1. Stack tecnológico

Problema: definir las herramientas base del proyecto.

Alternativas consideradas: Redux Toolkit / Context+useReducer / Zustand para estado global; CSS Modules / Styled Components / Tailwind para estilos; fetch nativo / TanStack Query para datos.

Opción elegida:


Estructura de carpetas: por feature
Estado global: Zustand
Routing: React Router
Estilos: Tailwind CSS
Datos: fetch nativo (con capa de servicios propia)
Componentes: separación entre lógica (hooks) y presentación (componentes visuales)


Justificación: stack simple y suficiente para el alcance del proyecto (mock local, sin backend real), priorizando herramientas ya conocidas y evitando sobre-ingeniería. Se detalla con más profundidad a medida que se implementen las funcionalidades.
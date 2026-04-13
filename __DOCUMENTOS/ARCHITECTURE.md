# Technical Architecture: Team LAST (Vanilla SPA)

## 1. Tech Stack
- **Frontend:** HTML5, CSS3 Moderno (Custom Properties), Vanilla JavaScript (ES6+).
- **Backend:** Supabase (Auth & Database).
- **SPA Engine:** Router personalizado en JS nativo (History API).
- **Templating:** Sistema de inyección de componentes mediante Fetch y Template Tags.
- **Libraries (Local Only):** Chart.js (telemetría), Lucide (iconos) - Servidas localmente desde `/lib/vendor/`.

## 2. SPA & Component Logic
- **Routing:** Un archivo `router.js` escucha los cambios de URL y carga el HTML correspondiente en un contenedor `<main id="app">`.
- **Global Components:** Header y Footer se cargan una sola vez al inicio (`app.init()`) para evitar duplicidad de código.
- **State Management:** Objeto global `AppState` para manejar la sesión de usuario y datos cacheados.

## 3. Persistencia de Datos
Las consultas a APIs externas se almacenan en Supabase como caché. El cliente consume de Supabase para garantizar disponibilidad inmediata.

## 4. Estructura de Directorios
```text
/root
  ├── /assets          (Imágenes, Logos, Fuentes)
  ├── /css             (Módulos CSS)
  │    ├── base.css    (Reset, Variables, Tipografía)
  │    ├── layout.css  (Grid, Flexbox, Header/Footer)
  │    ├── components.css (Cards, Buttons, Glassmorphism)
  │    └── theme.css   (Dark Mode, Colores de Equipo)
  ├── /js
  │    ├── app.js      (Punto de entrada)
  │    ├── router.js   (Lógica de navegación SPA)
  │    ├── components.js (Cargador de plantillas HTML)
  │    └── /services   (supabase.js, api-sim.js)
  ├── /lib             (Librerías descargadas localmente)
  ├── /views           (Fragmentos HTML de cada sección)
  └── index.html       (Contenedor principal único)
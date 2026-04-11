# Product Requirements Document: Team LAST - The Resurgence

## 1. Visión del Proyecto
Revivir la identidad de Team LAST (originario de Live For Speed) mediante una plataforma moderna que combine la nostalgia de un equipo legendario con la tecnología de punta del simracing actual. La web debe servir como portal público, herramienta de reclutamiento y centro de operaciones interno.

## 2. Objetivos Principales
- **Presencia de Marca:** Establecer una estética "Legendaria y Moderna" en Dark Mode con los colores representativos del equipo. (Azul Cobalto y Naranja Eléctrico)
- **Roster Vivo:** Mostrar a los pilotos con estadísticas dinámicas mediante APIs.
- **Área Privada:** Espacio seguro para que los miembros gestionen setups y estrategias.
- **Reclutamiento:** Proceso fluido para nuevos talentos y altas rápidas por invitación.

## 3. Funcionalidades Clave (MVP)
### Fase 1: Landing & Identidad
- Hero section con narrativa de "Resurgimiento".
- Historia del equipo (LFS hasta la actualidad).
- Sección de Patrocinadores (integración elegante/sutil).

### Fase 2: Roster y Estadísticas
- Fichas de pilotos con integración de APIs (iRacing, Assetto Corsa, ACC, ACEVO,AC RALLY, GT7, etc).
- Sistema de Fallback: Si la API falla, mostrar últimos datos cacheados.
- Feed de actividad social por piloto (Facebook, Instagram, Youtube, Twitch, Kick, TikTok y X status).

### Fase 3: Dashboard Interno (Auth required)
- Repositorio de Setups (categorizados por simulador/pista).
- Repositorio de Skins (categorizados por simulador/auto).
- Calendario de carreras con sistema de asistencia.
- Panel de administración para noticias y gestión de usuarios.

## 4. Criterios de Éxito
- Carga ultra rápida (Optimización Next.js).
- Interfaz intuitiva y estética "Premium/Sutil".
- Funcionalidad híbrida Online/Offline de los datos de telemetría.
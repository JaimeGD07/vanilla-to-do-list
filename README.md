# To-Do List — Refactorización con Clean Code y SOLID

Aplicación de lista de tareas construida con JavaScript vanilla + Vite.

## Cómo ejecutar

\`\`\`bash
npm install
npm run dev
\`\`\`

## Arquitectura

\`\`\`
src/
├── css/
│   └── style.css
└── js/
    ├── models/
    │   └── Task.js                    # Entidad de dominio
    ├── repositories/
    │   ├── TaskRepository.js          # Contrato abstracto (DIP)
    │   ├── LocalStorageTaskRepository.js
    │   └── InMemoryTaskRepository.js  # Implementación alterna (demuestra LSP)
    ├── services/
    │   └── TaskService.js             # Lógica de negocio, sin conocer el DOM
    ├── filters/
    │   ├── FilterStrategy.js          # Contrato de estrategia (OCP)
    │   ├── AllFilter.js
    │   ├── ActiveFilter.js
    │   ├── CompletedFilter.js
    │   └── filterRegistry.js
    ├── ui/
    │   ├── TaskListRenderer.js        # Solo pinta la lista (SRP)
    │   ├── StatsRenderer.js           # Solo pinta estadísticas (SRP)
    │   └── FilterButtonsRenderer.js   # Solo maneja estado visual de filtros (SRP)
    ├── controllers/
    │   └── TaskController.js          # Orquesta servicio + UI (DIP, ISP)
    └── app.js                         # Punto de entrada (composition root)
\`\`\`

## Principios SOLID aplicados

- **SRP**: cada clase tiene una única responsabilidad — `TaskService` solo maneja lógica de negocio, `TaskListRenderer`/`StatsRenderer`/`FilterButtonsRenderer` solo manipulan el DOM, `LocalStorageTaskRepository` solo persiste datos.
- **OCP**: agregar un nuevo filtro (ej. "Vencidas") solo requiere crear una clase que extienda `FilterStrategy` y registrarla en `filterRegistry.js`, sin modificar `TaskController` ni `TaskService`.
- **LSP**: `LocalStorageTaskRepository` e `InMemoryTaskRepository` son intercambiables en cualquier lugar donde se use `TaskRepository` (ej. dentro de `TaskService`) sin alterar su comportamiento esperado.
- **ISP**: en vez de un único renderer "todo en uno", la UI se divide en tres interfaces pequeñas y enfocadas (`TaskListRenderer`, `StatsRenderer`, `FilterButtonsRenderer`), cada una con solo los métodos que su consumidor necesita.
- **DIP**: `TaskService` depende de la abstracción `TaskRepository`, no de `localStorage` directamente. `TaskController` recibe todas sus dependencias por constructor (inyección de dependencias), en vez de crearlas internamente.

## Clean Code

- Nombres descriptivos (`newTask`, `filteredTasks`, `taskRepository`) en lugar de nombres genéricos.
- Funciones pequeñas con una sola responsabilidad cada una.
- Manejo explícito de errores (`try/catch` + mensajes descriptivos) en operaciones de negocio y de persistencia.
- Sin duplicación de lógica de filtrado o de renderizado.
- Formato consistente en todo el proyecto.
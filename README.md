# vanilla-to-do-list-refactor

Refactor del proyecto [vanilla-to-do-list](https://github.com/AnnRodrg/vanilla-to-do-list) aplicando principios SOLID y buenas practicas de Clean Code.

## Objetivo

Este repositorio contiene la version refactorizada de una aplicacion de lista de tareas (to-do list) originalmente escrita en un unico archivo JavaScript, sin separacion de responsabilidades. El objetivo del refactor es mejorar la mantenibilidad, testabilidad y escalabilidad del codigo.

## Principios SOLID aplicados

- **SRP (Single Responsibility Principle):** cada clase tiene una unica responsabilidad. `Task` modela los datos, `TaskService` contiene la logica de negocio, `TaskView` maneja el renderizado del DOM y `TaskController` coordina la interaccion entre ambos.
- **OCP (Open/Closed Principle):** el sistema de persistencia esta abierto a extension (se pueden agregar nuevos repositorios, por ejemplo uno basado en una API remota) sin modificar el codigo existente.
- **LSP (Liskov Substitution Principle):** `LocalStorageTaskRepository` puede sustituir a `TaskRepository` sin alterar el comportamiento esperado por quienes lo consumen.
- **ISP (Interface Segregation Principle):** `TaskRepository` expone solo los metodos necesarios para persistencia (`getAll`, `saveAll`), evitando interfaces sobrecargadas.
- **DIP (Dependency Inversion Principle):** `TaskService` y `TaskController` dependen de abstracciones inyectadas por constructor, no de implementaciones concretas. La composicion de dependencias ocurre en `main.js`.

## Estructura del proyecto

```
src/
  models/          Entidades del dominio (Task)
  repositories/     Contratos y adaptadores de persistencia
  services/          Logica de negocio (TaskService)
  views/               Renderizado de la interfaz (TaskView)
  controllers/       Coordinacion entre logica y vista (TaskController)
  main.js              Composition root: inyeccion de dependencias
  style.css            Estilos de la aplicacion
index.html
```

## Clean Code

- Nombres descriptivos para clases, metodos y variables.
- Funciones pequenas con una unica responsabilidad.
- Eliminacion de codigo duplicado presente en la version original (manipulacion repetida del DOM, logica de filtrado repetida).
- Manejo de errores explicito mediante try/catch y validaciones, evitando fallos silenciosos.
- Formato consistente en todo el codigo (2 espacios de indentacion).

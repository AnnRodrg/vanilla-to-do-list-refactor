/**
 * Contrato (interfaz) para persistencia de tareas.
 * Aplica DIP: los modulos de alto nivel dependen de esta abstraccion,
 * no de una implementacion concreta de almacenamiento.
 * Aplica ISP: expone solo los metodos necesarios para persistencia.
 */
export class TaskRepository {
  getAll() {
    throw new Error('getAll() debe ser implementado');
  }

  saveAll(tasks) {
    throw new Error('saveAll() debe ser implementado');
  }
}

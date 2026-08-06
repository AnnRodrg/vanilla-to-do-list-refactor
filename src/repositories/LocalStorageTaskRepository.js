import { TaskRepository } from './TaskRepository.js';
import { Task } from '../models/Task.js';

const STORAGE_KEY = 'tasks';

/**
 * Implementacion concreta de TaskRepository usando localStorage.
 * Cumple LSP: puede sustituir a TaskRepository sin romper el contrato.
 * Cumple OCP: se pueden agregar nuevas implementaciones (ej. API remota)
 * sin modificar el codigo que consume TaskRepository.
 */
export class LocalStorageTaskRepository extends TaskRepository {
  getAll() {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (!savedTasks) return [];
      const parsed = JSON.parse(savedTasks);
      return parsed.map(Task.fromJSON);
    } catch (error) {
      console.error('Error al leer tareas de localStorage:', error);
      return [];
    }
  }

  saveAll(tasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar tareas en localStorage:', error);
    }
  }
}

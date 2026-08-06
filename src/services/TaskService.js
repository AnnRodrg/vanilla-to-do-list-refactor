import { Task } from '../models/Task.js';

/**
 * TaskService encapsula la logica de negocio relacionada a tareas.
 * Aplica SRP: separa las reglas de negocio del acceso a datos (repository)
 * y de la interfaz de usuario (controller/view).
 * Aplica DIP: depende de la abstraccion TaskRepository, inyectada por
 * constructor, no de una implementacion concreta.
 */
export class TaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
    this.tasks = this.taskRepository.getAll();
  }

  getNextId() {
    return this.tasks.length > 0
      ? Math.max(...this.tasks.map((task) => task.id)) + 1
      : 1;
  }

  getAllTasks() {
    return this.tasks;
  }

  getTasksByFilter(filter) {
    if (filter === 'active') {
      return this.tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return this.tasks.filter((task) => task.completed);
    }
    return this.tasks;
  }

  addTask(text) {
    const trimmedText = text.trim();
    if (!trimmedText) {
      throw new Error('El texto de la tarea no puede estar vacio');
    }

    const newTask = new Task(this.getNextId(), trimmedText);
    this.tasks.push(newTask);
    this.persist();
    return newTask;
  }

  toggleTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new Error(`No se encontro la tarea con id ${id}`);
    }
    task.toggleCompleted();
    this.persist();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.persist();
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }

  persist() {
    this.taskRepository.saveAll(this.tasks);
  }
}

/**
 * Entidad Task: representa una tarea del to-do list.
 * Responsabilidad unica (SRP): modelar los datos de una tarea.
 */
export class Task {
  constructor(id, text, completed = false, createdAt = new Date().toISOString()) {
    this.id = id;
    this.text = text;
    this.completed = completed;
    this.createdAt = createdAt;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  static fromJSON(json) {
    return new Task(json.id, json.text, json.completed, json.createdAt);
  }
}

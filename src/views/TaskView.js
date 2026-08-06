/**
 * TaskView es responsable unicamente de renderizar el DOM
 * relacionado a las tareas (SRP). No contiene logica de negocio
 * ni acceso a datos, solo manipulacion de la interfaz.
 */
export class TaskView {
  constructor({ taskListId, statsId, filterButtonsSelector }) {
    this.taskListElement = document.getElementById(taskListId);
    this.statsElement = document.getElementById(statsId);
    this.filterButtons = document.querySelectorAll(filterButtonsSelector);
  }

  renderTasks(tasks, handlers) {
    this.taskListElement.innerHTML = '';

    if (tasks.length === 0) {
      this.taskListElement.innerHTML = '<p class="empty-state">No hay tareas para mostrar</p>';
      return;
    }

    tasks.forEach((task) => {
      const taskElement = this.createTaskElement(task, handlers);
      this.taskListElement.appendChild(taskElement);
    });
  }

  createTaskElement(task, { onToggle, onDelete }) {
    const taskDiv = document.createElement('div');
    taskDiv.className = task.completed ? 'task-item completed' : 'task-item';

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.textContent = task.completed ? 'Reactivar' : 'Completar';
    completeBtn.addEventListener('click', () => onToggle(task.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => onDelete(task.id));

    taskDiv.append(textSpan, completeBtn, deleteBtn);
    return taskDiv;
  }

  renderStats({ total, completed, active }) {
    this.statsElement.textContent = `Total: ${total} | Completadas: ${completed} | Activas: ${active}`;
  }

  updateActiveFilterButton(filter) {
    this.filterButtons.forEach((button) => {
      const isActive = button.getAttribute('data-filter') === filter;
      button.classList.toggle('active', isActive);
    });
  }

  getTaskInputValue() {
    return document.getElementById('taskInput').value;
  }

  clearTaskInput() {
    document.getElementById('taskInput').value = '';
  }

  showError(message) {
    alert(message);
  }
}

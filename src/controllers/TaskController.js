src/controllers/TaskController.js/**
 * TaskController orquesta la interaccion entre TaskService (logica)
 * y TaskView (interfaz), respondiendo a eventos del usuario.
 * Aplica SRP: unica responsabilidad de coordinar servicio y vista.
 * Aplica DIP: recibe TaskService y TaskView por inyeccion de dependencias.
 */
export class TaskController {
  constructor(taskService, taskView) {
    this.taskService = taskService;
    this.taskView = taskView;
    this.currentFilter = 'all';
  }

  init() {
    this.bindAddTask();
    this.bindFilterButtons();
    this.bindEnterKey();
    this.refresh();
  }

  bindAddTask() {
    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', () => this.handleAddTask());
  }

  bindEnterKey() {
    const input = document.getElementById('taskInput');
    input.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        this.handleAddTask();
      }
    });
  }

  bindFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        this.handleFilterChange(filter);
      });
    });
  }

  handleAddTask() {
    const text = this.taskView.getTaskInputValue();
    try {
      this.taskService.addTask(text);
      this.taskView.clearTaskInput();
      this.refresh();
    } catch (error) {
      this.taskView.showError(error.message);
    }
  }

  handleToggleTask(id) {
    try {
      this.taskService.toggleTask(id);
      this.refresh();
    } catch (error) {
      this.taskView.showError(error.message);
    }
  }

  handleDeleteTask(id) {
    this.taskService.deleteTask(id);
    this.refresh();
  }

  handleFilterChange(filter) {
    this.currentFilter = filter;
    this.taskView.updateActiveFilterButton(filter);
    this.refresh();
  }

  refresh() {
    const tasks = this.taskService.getTasksByFilter(this.currentFilter);
    this.taskView.renderTasks(tasks, {
      onToggle: (id) => this.handleToggleTask(id),
      onDelete: (id) => this.handleDeleteTask(id),
    });
    this.taskView.renderStats(this.taskService.getStats());
  }
}

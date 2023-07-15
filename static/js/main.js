class TaskManager {
    constructor() {
        this.todoListContainer = document.querySelector('#todoListContainer');
        this.completedTaskContainer = document.querySelector('#completedTaskContainer');
        this.taskForm = document.getElementById('taskForm');
        this.removeConfirmationModal = new bootstrap.Modal(document.getElementById('removeConfirmationModal'));
        this.emptyFieldsModal = new bootstrap.Modal(document.getElementById('emptyFieldsModal'));

        this.taskForm.addEventListener('submit', this.handleTaskFormSubmit.bind(this));
        this.completedTaskContainer.addEventListener('click', this.handleCompletedTaskContainerClick.bind(this));
        this.todoListContainer.addEventListener('click', this.handleTodoListContainerClick.bind(this));
    }

    createTask(task) {
        const newTaskElement = document.createElement('div');
        newTaskElement.className = 'col';
        newTaskElement.innerHTML = `
          <div class="p-3 shadow-sm rounded-2 bg-white position-relative">
          <div class="taskDimensions">
            <button type="button" class="bi-trash3 position-absolute bottom-0 end-0 border-0 bg-white rounded-2" aria-label="Close"></button>
            <button type="button" class="bi-check2-square position-absolute bottom-0 start-0 border-0 bg-white rounded-2" aria-label="Close"></button>
            <span class="position-absolute translate-middle top-0 p-2 ${task.urgencyBackgroundColor} bg-gradient bg-opacity-50 border border-light badge fw-medium text-uppercase">${task.urgencyName}</span>
            <span class="position-absolute translate-middle top-100 badge bg-dark-subtle text-white">${task.formattedDate}</span>
            <div class="row justify-content-center text-break">
              <div class="col-12">
                <h6>${task.title}</h6>
              </div>
              <div class="col-12">
                <span class="fs-6 fw-light opacity-75">${task.details}</span>
              </div>
            </div>
          </div>
          </div>`;

        this.todoListContainer.appendChild(newTaskElement);
    }

    getUrgencyValues(urgencyValue) {
        let name, backgroundColor, borderColor;

        if (urgencyValue == "Low" || urgencyValue == "bg-success" || urgencyValue == "border-success") {
            name = "Low"
            backgroundColor = "bg-success";
            borderColor = "border-success"
        } else if (urgencyValue == "Medium" || urgencyValue == "bg-warning" || urgencyValue == "border-warning") {
            name = "Medium"
            backgroundColor = "bg-warning";
            borderColor = "border-warning"
        } else if (urgencyValue == "Critical" || urgencyValue == "bg-danger" || urgencyValue == "border-danger") {
            name = "Critical"
            backgroundColor = "bg-danger";
            borderColor = "border-danger"
        }

        return { name, backgroundColor, borderColor };
    }

    moveTaskToCompleted(taskElement) {
        const completedDate = taskElement.querySelector('.position-absolute.translate-middle.top-100.badge.bg-dark-subtle.text-white').textContent;
        const completedTitle = taskElement.querySelector('.row.justify-content-center').children[0].children[0].textContent;
        const completedDescription = taskElement.querySelector('.row.justify-content-center').children[1].children[0].textContent;
        const completedUrgency = taskElement.querySelector('.p-3.shadow-sm.rounded-2.bg-white.position-relative').children[0].children[2].textContent;
        const urgencyValues = this.getUrgencyValues(completedUrgency);

        const completedTaskElement = document.createElement('div');
        completedTaskElement.id = taskElement.id;
        completedTaskElement.className = 'row position-relative bg-white border-end border-5 ' + urgencyValues.borderColor + ' border-success border-opacity-50 opacity-75 mt-2 p-2';
        completedTaskElement.innerHTML = `
      <div class="col-1">
          <button type="button"
              class="bi-arrow-return-left position-absolute top-50 text-opacity-75 translate-middle-y border-0 bg-white"
              aria-label="Close">
          </button>
      </div>
      <div class="col-6">
          <div class="row">
              <h6 class="text-black text-opacity-50 fw-bold text-decoration-line-through">${completedTitle}</h6>
              <span class="text-black text-opacity-50 fw-lighter text-decoration-line-through">${completedDescription}</span>
          </div>
      </div>
      <div class="col-4 d-flex">
          <div class="align-self-center">
              <span class="text-black text-opacity-50 fw-lighter text-decoration-line-through">
              ${completedDate}</span>
          </div>
          <div class="col">
              <button type="button"
                  class="bi-x-square position-absolute top-50 end-0 text-opacity-75 translate-middle-y border-0 bg-white me-1"
                  aria-label="Close">
              </button>
          </div>
      </div>`;

        this.completedTaskContainer.appendChild(completedTaskElement);
    }

    moveTaskToTodoList(completedTaskElement) {
        const completedTaskTitle = completedTaskElement.querySelector('.col-6').children[0].children[0].textContent;
        const completedTaskDescription = completedTaskElement.querySelector('.col-6').children[0].children[1].textContent;
        const completedTaskDate = completedTaskElement.querySelector('.col-4').children[0].children[0].textContent;
        const completedTaskUrgency = completedTaskElement.classList.item(5);
        const completedUrgencyValues = this.getUrgencyValues(completedTaskUrgency);

        const newTaskElement = document.createElement('div');
        newTaskElement.id = completedTaskElement.id;
        newTaskElement.className = 'col';
        newTaskElement.innerHTML = `
      <div class="p-3 shadow-sm rounded-2 bg-white position-relative">
      <div class="taskDimensions">
        <button type="button" class="bi-trash3 position-absolute bottom-0 end-0 border-0 bg-white rounded-2" aria-label="Close"></button>
        <button type="button" class="bi-check2-square position-absolute bottom-0 start-0 border-0 bg-white rounded-2" aria-label="Close"></button>
        <span class="position-absolute translate-middle top-0 p-2 ${completedUrgencyValues.backgroundColor} bg-gradient bg-opacity-50 border border-light badge fw-medium text-uppercase">${completedUrgencyValues.name}</span>
        <span class="position-absolute translate-middle top-100 badge bg-dark-subtle text-white">${completedTaskDate}</span>
        <div class="row justify-content-center text-break">
          <div class="col-12">
            <h6>${completedTaskTitle}</h6>
          </div>
          <div class="col-12">
            <span class="fs-6 fw-light opacity-75">${completedTaskDescription}</span>
          </div>
        </div>
      </div>
      </div>`;

        this.todoListContainer.appendChild(newTaskElement);
    }

    removeTask(taskElement) {
        setTimeout(() => {
            taskElement.remove();
        }, 500);
    }

    handleTaskFormSubmit(event) {
        event.preventDefault();

        const newTaskTitle = document.getElementById('newTaskTitle').value;
        const newTaskDetails = document.getElementById('newTaskDetails').value;
        const newTaskUrgency = document.getElementById('newTaskUrgency').value;
        const newTaskDate = document.getElementById('newTaskDate').value;

        if (newTaskTitle.trim() === '' || newTaskDetails.trim() === '' || newTaskUrgency == 0 || newTaskDate.trim() === '') {
            this.emptyFieldsModal.show();
        } else {
            const date = new Date(newTaskDate);

            const formattedDate = date.toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });

            const urgencyValues = this.getUrgencyValues(newTaskUrgency);

            const task = {
                title: newTaskTitle,
                details: newTaskDetails,
                urgencyName: urgencyValues.name,
                urgencyBackgroundColor: urgencyValues.backgroundColor,
                formattedDate: formattedDate
            };

            this.createTask(task);
        }
    }

    handleCompletedTaskContainerClick(event) {
        const target = event.target;
        if (target.classList.contains('bi-arrow-return-left')) {
            const completedTaskElement = target.closest('.row.position-relative.bg-white');
            completedTaskElement.classList.add('fade-out');
            this.removeTask(completedTaskElement);
            this.moveTaskToTodoList(completedTaskElement);
        } else if (target.classList.contains('bi-x-square')) {
            this.removeConfirmationModal.show();
            const approveButton = document.querySelector('#approveButton');
            approveButton.addEventListener('click', () => {
                this.removeConfirmationModal.hide();
                const completedTaskElement = target.closest('.row.position-relative.bg-white.border-end');
                completedTaskElement.classList.add('fade-out');
                this.removeTask(completedTaskElement);
            });
        }
    }

    handleTodoListContainerClick(event) {
        const target = event.target;
        if (target.classList.contains('bi-trash3')) {
            this.removeConfirmationModal.show();
            const approveButton = document.querySelector('#approveButton');
            approveButton.addEventListener('click', () => {
                this.removeConfirmationModal.hide();
                const taskElement = target.closest('.col');
                taskElement.classList.add('fade-out');
                this.removeTask(taskElement);
            });
        } else if (target.classList.contains('bi-check2-square')) {
            const taskElement = target.closest('.col');
            taskElement.classList.add('fade-out');
            this.removeTask(taskElement);
            this.moveTaskToCompleted(taskElement);
        }
    }
}

const taskManager = new TaskManager();

class TaskManager {
    constructor() {
        this.todoListContainer = document.querySelector('#todoListContainer');
        this.completedTaskContainer = document.querySelector('#completedTaskContainer');
        this.taskForm = document.getElementById('taskForm');
        this.taskForm.addEventListener('submit', event => this.handleTaskFormSubmit(event));
        this.completedTaskContainer.addEventListener('click', this.handleCompletedTaskContainerClick);
        this.todoListContainer.addEventListener('click', this.handleTodoListContainerClick);
    }

    getCookie = (name) => {
        const cookies = document.cookie.split('; ').reduce((cookieObj, cookie) => {
            const [cookieName, cookieValue] = cookie.split('=');
            cookieObj[cookieName] = cookieValue;
            return cookieObj;
        }, {});
        return cookies[name] || '';
    };

    createTask(task) {
        const newTaskElement = document.createElement('div');
        newTaskElement.id = task.task_number;
        newTaskElement.className = 'col';
        newTaskElement.innerHTML = `
          <div class="p-3 shadow-sm rounded-2 bg-white position-relative">
          <div class="taskDimensions">
            <button type="button" class="bi-trash3 position-absolute bottom-0 end-0 border-0 bg-white rounded-2" aria-label="Remove"></button>
            <button type="button" class="bi-check2-square position-absolute bottom-0 start-0 border-0 bg-white rounded-2" aria-label="Check"></button>
            <span class="position-absolute translate-middle top-0 p-2 ${task.priorityBackgroundColor} bg-gradient bg-opacity-50 border border-light badge fw-medium text-uppercase">${task.priorityName}</span>
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


    moveTaskToCompleted(taskElement) {
        const task_number = taskElement.id;

        fetch(`/move_task_to_completed/${task_number}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': this.getCookie('csrftoken'),
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Sunucudan hatalı yanıt alındı.');
                }
                return response.json();
            })
            .then(data => {
                const completedDate = taskElement.querySelector('.position-absolute.translate-middle.top-100.badge.bg-dark-subtle.text-white').textContent;
                const completedTitle = taskElement.querySelector('.row.justify-content-center').children[0].children[0].textContent;
                const completedDescription = taskElement.querySelector('.row.justify-content-center').children[1].children[0].textContent;
                const completedPriority = taskElement.querySelector('.p-3.shadow-sm.rounded-2.bg-white.position-relative').children[0].children[2].textContent;
                const priorityValues = getPriorityValues(completedPriority);

                const completedTaskElement = document.createElement('div');
                completedTaskElement.id = taskElement.id;
                completedTaskElement.className = 'row position-relative bg-white border-end border-5 ' + priorityValues.borderColor + ' border-success border-opacity-50 opacity-75 mt-2 p-2';
                completedTaskElement.innerHTML = `
                <div class="col-1">
                    <button type="button"
                        class="bi-arrow-return-left position-absolute top-50 text-opacity-75 translate-middle-y border-0 bg-white"
                        aria-label="Return">
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
                            aria-label="Delete">
                        </button>
                    </div>
                </div>`;

                this.completedTaskContainer.appendChild(completedTaskElement);
                showToast('The task has been added to the completed list.', 'info');

            })
            .catch(error => {
                showToast('Error: ' + error.message, 'error');
            });


    }

    moveTaskToTodoList(completedTaskElement) {
        const task_number = completedTaskElement.id;
        fetch(`/move_completed_to_task/${task_number}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': this.getCookie('csrftoken'),
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('An error response was received from the server.');
                }
                return response.json();
            })
            .then(data => {
                const completedTaskTitle = completedTaskElement.querySelector('.col-6').children[0].children[0].textContent;
                const completedTaskDescription = completedTaskElement.querySelector('.col-6').children[0].children[1].textContent;
                const completedTaskDate = completedTaskElement.querySelector('.col-4').children[0].children[0].textContent;
                const completedTaskPriority = completedTaskElement.classList.item(5);
                const completedPriorityValues = getPriorityValues(completedTaskPriority);

                const newTaskElement = document.createElement('div');
                newTaskElement.id = completedTaskElement.id;
                newTaskElement.className = 'col';
                newTaskElement.innerHTML = `
              <div class="p-3 shadow-sm rounded-2 bg-white position-relative">
              <div class="taskDimensions">
                <button type="button" class="bi-trash3 position-absolute bottom-0 end-0 border-0 bg-white rounded-2" aria-label="Delete"></button>
                <button type="button" class="bi-check2-square position-absolute bottom-0 start-0 border-0 bg-white rounded-2" aria-label="Check"></button>
                <span class="position-absolute translate-middle top-0 p-2 ${completedPriorityValues.backgroundColor} bg-gradient bg-opacity-50 border border-light badge fw-medium text-uppercase">${completedPriorityValues.name}</span>
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
                showToast('The completed task has been moved to the list of new tasks.', 'info');
                this.todoListContainer.appendChild(newTaskElement);
            })
            .catch(error => {
                showToast('Error: ' + error.message, 'error');
            });


    }

    async removeTaskWithDatabase(taskElement) {
        const task_number = taskElement.id;
        try {
            const response = await fetch(`/delete/${task_number}/`, {
                method: 'DELETE',
                headers: {
                    'X-CSRFToken': this.getCookie('csrftoken'),
                },
            });

            if (!response.ok) {
                throw new Error('Received an error response from the server.');
            }

            const data = await response.json();
            showToast('The task has been permanently deleted.', 'warning');
            this.removeTaskFromUI(taskElement);
        } catch (error) {
            const errorMessage = 'Error deleting the task: ' + ' ' + error.message;
            showToast(errorMessage, 'error');
        }
    }

    removeTaskFromUI(taskElement) {

        taskElement.remove();
    }

    handleTaskFormSubmit = (event) => {
        event.preventDefault();

        const newTaskTitle = document.getElementById('newTaskTitle').value;
        const newTaskDetails = document.getElementById('newTaskDetails').value;
        const newTaskPriority = document.getElementById('newTaskPriority').value;
        const newTaskDate = document.getElementById('newTaskDate').value;

        const formData = new FormData(event.target);
        fetch(event.target.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': formData.get('csrfmiddlewaretoken')
            }
        })
            .then(response => response.json())

            .then(data => {
                showToast('The task has been successfully added!', 'success');

                const date = new Date(newTaskDate);

                const formattedDate = date.toLocaleString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });

                const priorityValues = getPriorityValues(newTaskPriority);

                const task = {
                    title: newTaskTitle,
                    details: newTaskDetails,
                    priorityName: priorityValues.name,
                    priorityBackgroundColor: priorityValues.backgroundColor,
                    formattedDate: formattedDate,
                    task_number: data.task_number

                };
                this.createTask(task);
                this.taskForm.reset();

            })
            .catch(error => {
                showToast('Error: ' + error.message, 'error');
            });



    }

    handleCompletedTaskContainerClick = (event) => {
        const target = event.target;

        if (target.classList.contains('bi-arrow-return-left')) {
            const completedTaskElement = target.closest('.row.position-relative.bg-white');
            completedTaskElement.classList.add('fade-out');
            this.removeTaskFromUI(completedTaskElement);
            this.moveTaskToTodoList(completedTaskElement);
        } else if (target.classList.contains('bi-x-square')) {
            showDeleteConfirmationModal(target, (target) => {
                const completedTaskElement = target.closest('.row.position-relative.bg-white.border-end');
                completedTaskElement.classList.add('fade-out');
                this.removeTaskWithDatabase(completedTaskElement);
            });
        }
    }

    handleTodoListContainerClick = (event) => {
        const target = event.target;
        if (target.classList.contains('bi-trash3')) {
            showDeleteConfirmationModal(target, (target) => {
                const taskElement = target.closest('.col');
                taskElement.classList.add('fade-out');
                this.removeTaskWithDatabase(taskElement);
            });

        } else if (target.classList.contains('bi-check2-square')) {
            const taskElement = target.closest('.col');
            taskElement.classList.add('fade-out');
            this.removeTaskFromUI(taskElement);
            this.moveTaskToCompleted(taskElement);
        }
    }
}

function showToast(message, icon) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: false,
    });
    Toast.fire({
        icon: icon,
        title: message
    });
}

function showDeleteConfirmationModal(target, onConfirmCallback) {
    Swal.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'Are you sure you want to delete this completed task?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#EEA6AD',
        cancelButtonColor: '#91C6AD',
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirmCallback(target);
        }
    });
}

function getPriorityValues(priorityValue) {
    let name, backgroundColor, borderColor;

    if (priorityValue == "Low" || priorityValue == "bg-success" || priorityValue == "border-success") {
        name = "Low";
        backgroundColor = "bg-success";
        borderColor = "border-success";
    } else if (priorityValue == "Medium" || priorityValue == "bg-warning" || priorityValue == "border-warning") {
        name = "Medium";
        backgroundColor = "bg-warning";
        borderColor = "border-warning";
    } else if (priorityValue == "Critical" || priorityValue == "bg-danger" || priorityValue == "border-danger") {
        name = "Critical";
        backgroundColor = "bg-danger";
        borderColor = "border-danger";
    }

    return { name, backgroundColor, borderColor };
}

const taskManager = new TaskManager();

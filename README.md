# ToDo List App

Django To-Do List is a simple web application that helps users manage their tasks. Users can add new tasks, mark existing tasks as completed, and perform deletion operations.

This project is a simple ToDo list application built using Django, JavaScript, HTML, CSS and Bootstrap. Users can add, delete and mark completed tasks.

<img src="https://www.linkpicture.com/q/django-todo-list-tamamlanmis.jpg" type="image">
<img src="https://www.linkpicture.com/q/todo-list-register.jpg" type="image">
<img src="https://www.linkpicture.com/q/todo-list-login.jpg" type="image">


## Features

- User-friendly interface for adding and managing tasks (Add new tasks, Delete tasks, Mark tasks as completed)
- Marking tasks as completed and deleting tasks
- User registration and login functionality
- User-specific task management

## Technologies Used
- Django
- PostgreSQL
- Bootstrap
- JavaScript
- HTML
- CSS
- SweetAlert2
- Crispy Forms

## Installation

1. Clone the project repository:

   ```bash
   $ git clone https://github.com/bariskorzay/Django-ToDo-List.git

2. Navigate to the project directory:

   ```bash
   cd todo-list-app

3. Create and activate a virtual environment (optional):
   
   ```bash
   python -m venv env
   source env/bin/activate # For Windows: venv\Scripts\activate

4. Install the required dependencies:
   
   ```bash
   pip install -r requirements.txt

5. Create the database and apply migrations:
   
   ```bash
   python manage.py makemigrations
   python manage.py migrate

5. To make our ToDo App live, create an admin user by running the following command in the terminal, and provide a username, password, and email when prompted.
   ```bash
   python manage.py createsuperuser

6. Let's start the server and make our ToDo App live with the following command:
    ```bash
      python manage.py runserver

7. Please go to http://127.0.0.1:8000 or http://localhost:8000 to access the application.

## Development

To contribute to the Django To-Do List application, follow these steps:

- Fork this repository to your own account.
- Add new features or fix bugs.
- Ensure your changes are tested.
- Submit your changes as a pull request to the main repository.

## Contributors

- Barış Korzay

## License
This project is licensed under the MIT License. For more information, see the LICENSE file.



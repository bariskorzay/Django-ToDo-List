# ToDo List App

This project is a simple ToDo list application built using Django, JavaScript, HTML, and Bootstrap. Users can add, delete and mark completed tasks.

<a href="https://www.linkpicture.com/view.php?img=LPic64ba2151779c01141019693"><img src="https://www.linkpicture.com/q/django-todo-list-tamamlanmis.jpg" type="image"></a>

## Features

- Add new tasks
- Delete tasks
- Mark tasks as completed

## Installation

1. Clone the project repository:

   ```bash
   git clone https://github.com/USERNAME/todo-list-app.git
   cd todo-list-app

2. Create and activate a virtual environment (optional):
   ```bash
   python -m venv env
   source env/bin/activate

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt

4. Create the database and start the Django project:
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

## Technologies Used
- Django
- JavaScript
- HTML
- Bootstrap

## License
This project is licensed under the MIT License. For more information, see the LICENSE file.



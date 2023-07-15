from django.shortcuts import render
from .models import Task


def task_list(request):
    tasks = Task.objects.all()

    context = {
        'tasks': tasks
    }

    return render(request, 'index.html', context)

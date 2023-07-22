from django.shortcuts import render
from .models import Task
from .forms import TodoForm
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
import uuid


def create_task(request):

    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            task_instance = form.save()
            task_number = task_instance.task_number
            return JsonResponse({'message': 'Success', 'task_number': str(task_number)})
        else:
            return JsonResponse({'message': 'Form is invalid'}, status=400)
    else:
        form = TodoForm()

    tasks = Task.objects.filter(completed=False).order_by('-created_at')
    completed_tasks = Task.objects.filter(
        completed=True).order_by('-created_at')

    context = {'form': form,
               'tasks': tasks,
               'completed_tasks': completed_tasks}

    return render(request, "index.html", context)


def delete_task(request, task_number):
    if request.method == 'DELETE':
        task = get_object_or_404(Task, task_number=task_number)
        task.delete()
        return JsonResponse({'message': 'Successfully deleted.'})
    else:
        return JsonResponse({'message': 'Invalid request.'}, status=400)


def move_task_to_completed(request, task_number):
    if request.method == 'POST':
        task = get_object_or_404(Task, task_number=task_number)
        task.completed = True
        task.save()
        return JsonResponse({'message': 'Task successfully marked as completed.'})
    else:
        return JsonResponse({'message': 'Invalid request.'}, status=400)


def move_completed_to_task(request, task_number):
    if request.method == 'POST':
        task = get_object_or_404(Task, task_number=task_number)
        task.completed = False
        task.save()
        return JsonResponse({'message': 'Task successfully marked as pending.'})
    else:
        return JsonResponse({'message': 'Invalid request.'}, status=400)

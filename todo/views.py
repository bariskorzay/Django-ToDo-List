from django.shortcuts import render, redirect
from .models import Task
from .forms import TodoForm, SignUpForm, SignInForm
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth import login, get_user_model, logout, authenticate
from django.contrib import messages
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User


def create_task(request):

    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            task_instance = form.save(commit=False)
            print(request.user)
            if not request.user.is_authenticated:
                user = User.objects.get(username='test')
                task_instance.user = user
            else:
                task_instance.user = request.user
            task_number = task_instance.task_number
            task_instance.save()
            return JsonResponse({'message': 'Success', 'task_number': str(task_number)})

        else:
            return JsonResponse({'message': 'Form is invalid'}, status=400)
    else:
        form = TodoForm()

    if request.user.is_authenticated:
        tasks = Task.objects.filter(Q(user=request.user) & Q(
            completed=False)).order_by('-created_at')
        completed_tasks = Task.objects.filter(Q(user=request.user) & Q(
            completed=True)).order_by('-created_at')
    else:
        tasks = None
        completed_tasks = None
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


def sign_up(request):
    if request.user.is_authenticated:
        return redirect('/')
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/')
    else:
        form = SignUpForm()
    return render(request, 'sign-up.html', {'form': form})


def sign_out(request):
    logout(request)
    return redirect('/')


def sign_in(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return redirect('/')
        form = SignInForm()
        return render(request, 'sign-in.html', {'form': form})
    elif request.method == 'POST':
        form = SignInForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return redirect('/')
            else:
                messages.error(request, 'Invalid username or password')
        return render(request, 'sign-in.html', {'form': form})

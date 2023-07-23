from django.contrib import admin
from django.urls import path
from todo.views import create_task, delete_task, move_task_to_completed, move_completed_to_task, sign_up, sign_out, sign_in

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', create_task, name='create_task'),
    path('delete/<uuid:task_number>/', delete_task, name='delete_task'),
    path('move_task_to_completed/<uuid:task_number>/',
         move_task_to_completed, name='move_task_to_completed'),
    path('move_completed_to_task/<uuid:task_number>/',
         move_completed_to_task, name='move_completed_to_task'),
    path('sign-up/', sign_up, name='sign_up'),
    path('sign-out/', sign_out, name='sign_out'),
    path('sign-in/', sign_in, name='sign_in'),

]

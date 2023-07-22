from django import forms
from .models import Task
from django.utils import timezone
from django.core.exceptions import ValidationError


class TodoForm(forms.ModelForm):

    title = forms.CharField(widget=forms.TextInput(
        attrs={'class': 'form-control form-control-sm', 'id': 'newTaskTitle', 'name': 'newTaskTitle', 'placeholder': 'Enter a title for the task...'}))
    description = forms.CharField(widget=forms.Textarea(
        attrs={'class': 'form-control custom-textarea', 'id': 'newTaskDetails', 'name': 'newTaskDetails', 'rows': '4'}))
    priority = forms.ChoiceField(choices=Task.PRIORITY_CHOICES, widget=forms.Select(
        attrs={'class': 'form-select form-select-sm', 'id': 'newTaskPriority', 'name': 'newTaskPriority'}), initial='Priority Level')
    planned_date = forms.DateField(widget=forms.DateInput(
        attrs={'type': 'date', 'class': 'form-control datepicker', 'id': 'newTaskDate', 'name': 'newTaskDate'}))

    class Meta:
        model = Task
        fields = ["title", "description", 'priority', 'planned_date']

from django.contrib.auth.forms import UserCreationForm, get_user_model
from django import forms
from .models import Task
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from crispy_forms.helper import FormHelper


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


class SignInForm(forms.Form):
    username = forms.CharField(max_length=65, widget=forms.TextInput(attrs={

        "placeholder": "Enter your username",

    }))
    password = forms.CharField(max_length=65, widget=forms.TextInput(attrs={

        "placeholder": "Enter your password",

    }))

    def __init__(self, *args, **kwargs):
        super(SignInForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False
        self.fields['username'].error_messages = {
            'required': 'Please enter your username', 'max_length': 'Your username cannot be longer than 65 characters', 'invalid': 'Your username contains invalid characters'}
        self.fields['password'].error_messages = {
            'required': 'Please enter your password', 'max_length': 'Your password cannot be longer than 65 characters', 'invalid': 'Your password contains invalid characters'}


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, required=True)

    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'username',
                  'email', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super(SignUpForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_show_labels = False
        self.fields['first_name'].required = True
        self.fields['last_name'].required = True
        for field_name in ('username', 'email', 'password1', 'password2'):
            self.fields[field_name].help_text = ''
        self.fields['first_name'].error_messages = {
            'required': 'Please enter your first name.',
            'max_length': 'Your first name cannot be longer than 30 characters.'
        }
        self.fields['last_name'].error_messages = {
            'required': 'Please enter your last name.',
            'max_length': 'Your last name cannot be longer than 30 characters.'
        }
        self.fields['username'].error_messages = {
            'required': 'Please enter your username.',
            'max_length': 'Your username cannot be longer than 30 characters.',
            'invalid': 'Your username contains invalid characters.',
            'unique': 'This username is already in use.',
            'min_length': 'Your username must be at least 8 characters long.'
        }
        self.fields['email'].error_messages = {
            'required': 'Please enter your email address.',
            'max_length': 'Your email address cannot be longer than 254 characters.',
            'invalid': 'Please enter a valid email address.',
            'unique': 'This email address is already in use.'
        }
        self.fields['password1'].error_messages = {
            'required': 'Please enter your password.',
            'max_length': 'Your password cannot be longer than 65 characters.',
            'min_length': 'Your password must be at least 8 characters long.',
            'invalid': 'Your password contains invalid characters.',
            'password_mismatch': 'Your passwords do not match.'
        }
        self.fields['password2'].error_messages = {
            'required': 'Please enter your password.',
            'max_length': 'Your password cannot be longer than 65 characters.',
            'min_length': 'Your password must be at least 8 characters long.',
            'invalid': 'Your password contains invalid characters.',
            'password_mismatch': 'Your passwords do not match.'
        }

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user

    def clean_username(self):
        username = self.cleaned_data['username']
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError(
                "This username is already taken. Please choose a different one.")
        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError(
                "This email address is already registered. Please use a different one.")
        return email

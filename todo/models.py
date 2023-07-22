from django.db import models
from uuid import uuid4


class Task(models.Model):

    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('Critical', 'Critical'),
    ]

    title = models.CharField(max_length=200, null=False,
                             blank=False, verbose_name='Title')
    description = models.TextField(
        null=True, blank=True, verbose_name='Description')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Creation Date')
    completed = models.BooleanField(
        default=False, verbose_name='Is Completed?')
    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default='Low', verbose_name='Priority')
    planned_date = models.DateField(
        null=True, blank=True, verbose_name='Planned Date')
    task_number = models.UUIDField(default=uuid4, unique=True, editable=False)

# Generated by Django 4.2.2 on 2023-07-20 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0004_remove_task_task_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='task_number',
            field=models.CharField(default='BK', editable=False, max_length=9, unique=True),
        ),
    ]

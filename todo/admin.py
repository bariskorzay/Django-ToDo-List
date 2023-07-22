from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description',
                    'planned_date', 'priority', 'completed')
    list_filter = ('created_at', 'completed', 'priority')
    search_fields = ('title', 'description')
    list_editable = ('completed', 'priority')
    fieldsets = (
        ('Task Details', {
            'fields': ('title', 'description', 'priority', 'planned_date', 'completed',)
        }),
        ('Other Details', {
            'fields': ('created_at', 'task_number'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'task_number')

    class Meta:
        db_table = 'task_list'
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'

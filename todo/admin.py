from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'completed', 'priority')
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    list_editable = ('completed',)
    fieldsets = (
        ('Görev Detayları', {
            'fields': ('title', 'description', 'priority')
        }),
    )

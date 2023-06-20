from django.db import models


class Task(models.Model):

    PRIORITY_CHOICES = [
        ('low', 'Düşük'),
        ('medium', 'Orta'),
        ('high', 'Yüksek'),
    ]

    title = models.CharField(max_length=200, null=False,
                             blank=False, verbose_name='Başlık')
    description = models.TextField(
        null=True, blank=True, verbose_name='Açıklama')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Oluşturulma Tarihi')
    completed = models.BooleanField(
        default=False, verbose_name='Tamamlandı mı?')
    priority = models.CharField(
        max_length=20, choices=PRIORITY_CHOICES, default='low', verbose_name='Öncelik')

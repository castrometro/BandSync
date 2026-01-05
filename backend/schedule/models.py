from django.db import models
from django.conf import settings

class Event(models.Model):
    class Type(models.TextChoices):
        REHEARSAL = 'Ensayos', 'Ensayos'
        GIG = 'Show / Toque', 'Show / Toque'
        RECORDING = 'Grabación', 'Grabación'
        LISTENING = 'Escucha', 'Escucha'
        MEETING = 'Reunión', 'Reunión'

    title = models.CharField(max_length=200)
    date = models.DateTimeField()
    type = models.CharField(max_length=50, choices=Type.choices, default=Type.REHEARSAL)
    location = models.CharField(max_length=200, blank=True)
    objective = models.TextField(blank=True)
    attendees = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='events', blank=True)

    def __str__(self):
        return self.title

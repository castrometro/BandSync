from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'type', 'location')
    list_filter = ('type', 'date')
    search_fields = ('title', 'location', 'objective')
    filter_horizontal = ('attendees',)

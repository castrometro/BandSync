from django.contrib import admin
from .models import Album, Song, Link

@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_date')

class LinkInline(admin.TabularInline):
    model = Link
    extra = 1

@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'type', 'bpm', 'key', 'album')
    list_filter = ('status', 'type', 'album')
    search_fields = ('title', 'lyrics', 'notes')
    inlines = [LinkInline]

@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ('label', 'url', 'type', 'song')
    list_filter = ('type',)

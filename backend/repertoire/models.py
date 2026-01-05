from django.db import models

class Album(models.Model):
    title = models.CharField(max_length=200)
    release_date = models.DateField(null=True, blank=True)
    cover_art = models.CharField(max_length=500, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

class Song(models.Model):
    class Status(models.TextChoices):
        IDEA = 'Idea', 'Idea'
        DEMO = 'Demo', 'Demo'
        POLISHING = 'Polishing', 'Polishing'
        READY = 'Ready', 'Ready'

    class Type(models.TextChoices):
        ORIGINAL = 'Original', 'Original'
        COVER = 'Cover', 'Cover'

    title = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.IDEA)
    type = models.CharField(max_length=20, choices=Type.choices, default=Type.ORIGINAL)
    bpm = models.IntegerField(null=True, blank=True)
    key = models.CharField(max_length=10, null=True, blank=True)
    lyrics = models.TextField(null=True, blank=True)
    album = models.ForeignKey(Album, on_delete=models.SET_NULL, null=True, blank=True, related_name='songs')
    original_artist = models.CharField(max_length=200, null=True, blank=True)
    duration = models.CharField(max_length=20, null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.title

class Link(models.Model):
    class Type(models.TextChoices):
        SPOTIFY = 'spotify', 'Spotify'
        DRIVE = 'drive', 'Drive'
        YOUTUBE = 'youtube', 'YouTube'
        OTHER = 'other', 'Other'

    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name='links')
    label = models.CharField(max_length=100)
    url = models.URLField()
    type = models.CharField(max_length=20, choices=Type.choices, default=Type.OTHER)

    def __str__(self):
        return f"{self.label} ({self.song.title})"

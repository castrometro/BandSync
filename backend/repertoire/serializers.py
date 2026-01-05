from rest_framework import serializers
from .models import Song, Album, Link

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'label', 'url', 'type']

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['id', 'title', 'release_date', 'cover_art', 'description']

class SongSerializer(serializers.ModelSerializer):
    links = LinkSerializer(many=True, read_only=True)
    albumId = serializers.PrimaryKeyRelatedField(source='album', queryset=Album.objects.all(), allow_null=True)
    originalArtist = serializers.CharField(source='original_artist', allow_null=True, required=False)

    class Meta:
        model = Song
        fields = [
            'id', 'title', 'status', 'type', 'bpm', 'key', 'lyrics', 
            'albumId', 'originalArtist', 'duration', 'links', 'notes'
        ]

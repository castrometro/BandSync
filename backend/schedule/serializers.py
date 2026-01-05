from rest_framework import serializers
from .models import Event
from users.serializers import UserSerializer

class EventSerializer(serializers.ModelSerializer):
    attendees_details = UserSerializer(source='attendees', many=True, read_only=True)
    attendees = serializers.PrimaryKeyRelatedField(many=True, queryset=UserSerializer.Meta.model.objects.all(), write_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'type', 'location', 'objective', 'attendees', 'attendees_details']

from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    roles = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = User
        fields = ['id', 'email', 'roles', 'avatar', 'personal_goals']

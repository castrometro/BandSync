from django.contrib.auth.models import AbstractUser
from django.db import models
from .managers import CustomUserManager

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    username = None
    email = models.EmailField('email address', unique=True)
    roles = models.ManyToManyField(Role, blank=True, related_name='users')
    avatar = models.CharField(max_length=255, blank=True, null=True)
    personal_goals = models.TextField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email

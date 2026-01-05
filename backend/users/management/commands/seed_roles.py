from django.core.management.base import BaseCommand
from users.models import Role

class Command(BaseCommand):
    help = 'Seeds initial roles'

    def handle(self, *args, **kwargs):
        roles = ['Voz', 'Guitarra', 'Bajo', 'Batería', 'Teclados', 'Manager', 'Otro']
        for role_name in roles:
            Role.objects.get_or_create(name=role_name)
        self.stdout.write(self.style.SUCCESS('Roles seeded successfully'))

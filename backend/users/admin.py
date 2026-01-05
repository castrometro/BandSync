from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Role
from .forms import CustomUserCreationForm, CustomUserChangeForm

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    ordering = ('email',)
    list_display = ('email', 'is_staff')
    list_filter = ('roles', 'is_staff', 'is_superuser')
    search_fields = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'avatar', 'personal_goals')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions', 'roles'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'roles', 'avatar', 'personal_goals'),
        }),
    )
    filter_horizontal = ('roles', 'groups', 'user_permissions')

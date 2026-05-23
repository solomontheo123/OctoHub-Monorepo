from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Repository


@admin.register(Repository)
class RepositoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'is_private', 'stargazers_count', 'forks_count', 'open_issues_count', 'language')
    search_fields = ('name', 'description')
    list_filter = ('is_private', 'language', 'owner')

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    fieldsets = UserAdmin.fieldsets + (
        ("GitHub Profile Info", {"fields": ("bio", "avatar_url", "location", "ssh_key")}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
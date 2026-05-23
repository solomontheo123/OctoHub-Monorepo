from django.contrib import admin

# Register your models here.
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser

    fieldsets = UserAdmin.fieldsets + (
        ("GitHub Profile Info", {"fields": ("bio", "avatar_url", "location", "ssh_key")}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
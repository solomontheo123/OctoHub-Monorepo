from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    avatar_url = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)
    ssh_key = models.TextField(blank=True)

    def __str__(self):
        return self.username
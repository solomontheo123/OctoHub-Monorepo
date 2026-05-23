from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    bio = models.TextField(max_length=500, blank=True)
    avatar_url = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True)
    ssh_key = models.TextField(blank=True)

    def __str__(self):
        return self.username
class Repository(models.Model):
    # Establish a Many-to-One relationship. One user can have many repositories.
    # If a user deletes their account, cascade delete their synchronized repos.
    owner = models.ForeignKey(
        'CustomUser', 
        on_delete=models.CASCADE, 
        related_name='repositories'
    )
    
    # GitHub Specific Metadata
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    html_url = models.URLField(max_length=500, blank=True, default="")
    is_private = models.BooleanField(default=False)
    
    # Metrics Matrices for advanced analytics down the road
    stargazers_count = models.IntegerField(default=0)
    forks_count = models.IntegerField(default=0)
    open_issues_count = models.IntegerField(default=0)
    language = models.CharField(max_length=100, blank=True, default="Unknown")
    
    # Synchronization timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Repositories"
        # Prevent duplicate repos for the same user
        unique_together = ('owner', 'name')

    def __str__(self):
        return f"{self.owner.username} / {self.name}"
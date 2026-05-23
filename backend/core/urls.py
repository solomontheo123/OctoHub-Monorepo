from django.urls import path
from .views import GitHubCallbackView, ProfileDetailView, GitHubLoginRedirectView

urlpatterns = [
    path('users/<str:username>/', ProfileDetailView.as_view(), name='user-profile'),
    path('auth/github/login/', GitHubLoginRedirectView.as_view(), name='github-login-redirect'),
    path('auth/callback/', GitHubCallbackView.as_view(), name='github-callback'),
]
from django.urls import path
from .views import ProfileDetailView

urlpatterns = [
    path('users/<str:username>/', ProfileDetailView.as_view(), name='user-profile'),
]
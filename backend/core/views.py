from django.shortcuts import render
from rest_framework.views import APIView, settings
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework.permissions import AllowAny
import urllib
from .models import CustomUser
from .serializers import UserProfileSerializer

class ProfileDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        try:
            user = CustomUser.objects.get(username=username)
            serializer = UserProfileSerializer(user)
            return Response(serializer.data)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

class GitHubLoginRedirectView(APIView):
    permission_classes = [AllowAny] # Anyone can click login

    def get(self, request):
        # Base GitHub OAuth authorization endpoint
        base_url = "https://github.com/login/oauth/authorize"
        
        # Parameters required by GitHub's OAuth system
        params = {
            "client_id": settings.GITHUB_CLIENT_ID,
            "redirect_uri": settings.GITHUB_CALLBACK_URL,
            "scope": "read:user user:email repo", # Permissions we are asking for
            "allow_signup": "true"
        }
        
        # Safely encode parameters into a clean URL string
        url_args = urllib.parse.urlencode(params)
        auth_url = f"{base_url}?{url_args}"
        
        # Redirect the user's browser directly to GitHub
        return redirect(auth_url)
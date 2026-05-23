from django.shortcuts import render
from rest_framework.views import APIView, settings
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework.permissions import AllowAny
import urllib
from .models import CustomUser
from .serializers import UserProfileSerializer
import requests
from django.contrib.auth import login

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

class GitHubCallbackView(APIView):
      permission_classes = [AllowAny]

      def get(self, request):
          # 1. Capture the temporary code sent back by GitHub in the URL
          code = request.GET.get('code')
          if not code:
              return Response({"error": "No authorization code provided"}, status=400)

          # 2. Prepare the exchange request to get our permanent Access Token
          token_url = "https://github.com/login/oauth/access_token"
          headers = {"Accept": "application/json"}
          payload = {
              "client_id": settings.GITHUB_CLIENT_ID,
              "client_secret": settings.GITHUB_CLIENT_SECRET,
              "code": code,
              "redirect_uri": settings.GITHUB_CALLBACK_URL
          }

          # Fire off an outbound POST request to GitHub's token master server
          token_response = requests.post(token_url, data=payload, headers=headers).json()
          access_token = token_response.get("access_token")

          if not access_token:
              return Response({"error": "Failed to retrieve access token from GitHub"}, status=400)

          # 3. Use the fresh Access Token to fetch the user's private GitHub profile data
          user_data_url = "https://api.github.com/user"
          user_headers = {"Authorization": f"token {access_token}"}
          user_info = requests.get(user_data_url, headers=user_headers).json()

          # 4. Database Provisioning: Extract fields and upsert the user into Django
          username = user_info.get("login")
          email = user_info.get("email") or f"{username}@github.placeholder"
          bio = user_info.get("bio") or ""
          location = user_info.get("location") or ""
          avatar_url = user_info.get("avatar_url") or ""

          # Automatically find the user or create a brand new account for them instantly
          user, created = CustomUser.objects.get_or_create(
              username=username,
              defaults={
                  "email": email,
                  "bio": bio,
                  "location": location,
                  "avatar_url": avatar_url
              }
          )

          # Log the user into Django's session tracking engine
          login(request, user)

          # 5. Success! Redirect the user's browser back to our frontend dashboard page
          return redirect("http://localhost:3000/")
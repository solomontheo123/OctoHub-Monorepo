from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
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

        
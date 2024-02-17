from rest_framework import viewsets
from django.contrib.auth import authenticate, login
from . import models
from . import serializers


class UsersViewset(viewsets.ModelViewSet):
    serializer_class = serializers.Users

    def get_queryset(self):
        queryset = models.Users.objects.all()
        return queryset


# class LoginViewset(viewsets.ModelViewSet):
#     serializer_class = serializers.Users
#
#     def get_queryset(self):

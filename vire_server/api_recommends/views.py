from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from rest_framework.views import APIView
from rest_framework import permissions
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view
from django.db import connection
from datetime import datetime
from api_recommends.models import *

# Create your views here.


class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Users.objects.get(email=email, password=password)
            Users.objects.filter(user_id=user.user_id).update(logged_in=True)
            return JsonResponse({'success': True, 'message': 'Log-in successful'})
        except:
            return JsonResponse({'success': False, 'message': 'Log-in failed'})
    
    def get(self, request, format=None):
        email = request.GET.get('email')
        try:
            user = Users.objects.get(email=email)
            return JsonResponse(list(user), safe=False)
        except:
            return JsonResponse({'success': False, 'message': 'Log-in failed'})
        

class LogoutView(APIView):
    def post(self, request, format=None):
        email = self.request.data.get('email')
        password = self.request.data.get('password') 
        try:
            user = Users.objects.get(email=email, password=password)
            Users.objects.filter(user_id=user.user_id).update(logged_in=False)
            user = None
            return JsonResponse({ 'success': 'Log-out successful' })
        except:
            return JsonResponse({ 'error': 'Log-out failed' })


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        user = Users(username = username , password = password , email = email, logged_in = True,
                     created_at = datetime.now(), updated_at = datetime.now())
        user.save()
        try:
            Users.objects.get(email=email, password=password, username=username)
            return JsonResponse({'success': True, 'message': 'Register successful'})
        except:
            return JsonResponse({'success': False, 'message': 'Register failed'})

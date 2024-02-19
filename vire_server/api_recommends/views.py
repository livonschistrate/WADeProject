from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from rest_framework import permissions
from datetime import datetime
from api_recommends.models import *
from django.core import serializers
import json

# Create your views here.


class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Users.objects.get(email=email, password=password)
            Users.objects.filter(user_id=user.user_id).update(logged_in=True)        
            return JsonResponse({'success': True, 'message': 'Log-in successful', 'user_id' : user.user_id})
        except:
            return JsonResponse({'success': False, 'message': 'Log-in failed'})
        
class LoginAuthView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        user_id = request.data.get('user_id')
        user = Users.objects.get(user_id=user_id)
        user_json = serializers.serialize('json', [user])       
        return JsonResponse(user_json, safe=False)
        

class LogoutView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        user_id = request.data.get('user_id')
        try:
            user = Users.objects.get(user_id=user_id)
            Users.objects.filter(user_id=user.user_id).update(logged_in=False)
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

from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login
from rest_framework.decorators import api_view

# Create your views here.

@api_view(['POST'])
def login_app(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Log-in successful'})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})    
    else:
        return JsonResponse({'success': False, 'message': 'Invalid method'})

@api_view(['POST'])
def register_app(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return JsonResponse({'success': True, 'message': 'Registration successful'})
        else:
            return JsonResponse({'success': False, 'errors': form.errors})    
    else:
        return JsonResponse({'success': False, 'message': 'Invalid method'})
        

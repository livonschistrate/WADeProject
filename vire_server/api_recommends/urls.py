from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login_app, name='enter_app'),
    path('register/', register_app, name='create_account')
]

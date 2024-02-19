from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('login/get-user/', LoginAuthView.as_view()),
    path('register/', RegisterView.as_view()),
    path('logout/', LogoutView.as_view())
    # path('login/', login_app, name='enter_app'),
    # path('register/', register_app, name='create_account')
]

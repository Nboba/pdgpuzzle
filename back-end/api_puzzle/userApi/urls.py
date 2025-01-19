from django.urls import path, register_converter
from . import views


urlpatterns = [
    path('login/', views.login),
    path('register/', views.register),
    path('logout/', views.logout),
    path('isUserLogged/', views.isUserLogged),
    ]
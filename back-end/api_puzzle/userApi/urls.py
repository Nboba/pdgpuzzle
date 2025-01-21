from django.urls import path, register_converter
from . import views


urlpatterns = [
    path('login/', views.loginApi,name='login'),
    path('register/', views.registerApi, name='register'),
    path('logOut/', views.logout, name='logout'),
    path('isUserLogged/', views.isUserLogged, name='isUserLogged'),
    ]
from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.loginApi,name='login'),
    path('register/', views.registerApi, name='register'),
    path('logOut/', views.logout, name='logout'),
    path('isUserLogged/', views.isUserLogged, name='isUserLogged'),
    ]
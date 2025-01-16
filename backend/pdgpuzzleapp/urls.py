from django.urls import path, register_converter
from . import views,converters




urlpatterns = [
    path('Puzzle/dungeon/', views.postPeticionDungeon),
    path('Puzzle/', views.getDummyDungeon, name='Puzzle'),
    path('Puzzle/Solution/', views.getDummyDungeon),
]


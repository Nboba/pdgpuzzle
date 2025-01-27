from django.urls import path
from . import views




urlpatterns = [
    path('Puzzle/petition/<str:username>/', views.postPeticionDungeon,name='petitionPuzzle'),
    path('Puzzle/', views.getDummyDungeon, name='Puzzle'),
    path('Puzzle/Solution/', views.getDummyDungeon,name='SolutionPuzzle')
]


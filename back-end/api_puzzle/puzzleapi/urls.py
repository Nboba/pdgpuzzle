from django.urls import path
from . import views




urlpatterns = [
    path('Puzzle/petition/<str:username>/', views.postPeticionDungeon,name='petitionPuzzle'),
    path('Puzzle/', views.getDummyDungeon, name='Puzzle'),
    path('Puzzle/Solution/', views.getDummyDungeon,name='SolutionPuzzle'),
    path('Puzzle/public/', views.get_public_dungeon,name='public_puzzle'),
    path('Puzzle/<str:username>/cant<int:amount>/pages<int:page>/', views.get_user_puzzle,name='get_puzzles'),
    path('Puzzle/status/<str:username>/', views.get_status_puzzle,name='status_petition')
    
]




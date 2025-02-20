from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.views.decorators.http import require_GET
from django.views.decorators.http import require_http_methods
import json

from .models import DataPetition
from .models import DungeonData
from .models import PetitionManager
# Create your views here.
@ensure_csrf_cookie
def getDummyDungeon(request):
    try:
        return JsonResponse([DataPetition.getDungeonDummy(),
                             'ok',
                              200],safe=False)
    except Exception as e:
        return JsonResponse({'response':'Error al obtener el dungeon dummy'},status=400)
    
@ensure_csrf_cookie
@login_required
@require_POST
def postPeticionDungeon(request,username):
    params = request.body
    try: 
        if User.objects.filter(username=username).exists() == False:
             return JsonResponse({'response':'Usuario no existe','status':
                                    400},safe=False)
        else:
            user=User.objects.get(username=username)
            if PetitionManager.objects.filter(user_id=user.id,status_p='pending').exists() == True:
                return JsonResponse({'response':'Usuario tiene una peticion pendiente','status':
                                    400},safe=False)
            else:
                petition=json.loads(params)['petition']
                data_petition= DataPetition(height=petition['height'],
                                           nWidth=petition['width'],
                                           expantion_factor=petition['expantionFactor'],
                                           enemy_factor=petition['enemyFactor'],
                                           block_factor=petition['blockFactor'],
                                           n_pop=petition['nPop'],
                                           max_iter=petition['maxIter'],
                                           max_moves=petition['maxMoves'],
                                           mutation_factor=petition['mutationFactor'])
                data_petition.save()
                dungeon_petition=PetitionManager(user_id=user,petition_data=data_petition,status_p='pending')
                dungeon_petition.save()
                return JsonResponse({'response':'Peticion de creacion de dungeon Aceptada','status':200})
    except Exception as e:
        return JsonResponse({'response':str(e)})  
 
@ensure_csrf_cookie
@require_GET   
def get_public_dungeon(request):
    try:
        dataDungeon = list(DungeonData.objects.filter(public=True))
        
        return JsonResponse({'DataDungeon':dataDungeon,
                                'response':'ok',
                                'status':200},safe=False)
    except Exception as e:
        return JsonResponse({'response':str(e)})
    



@ensure_csrf_cookie
@login_required
@require_GET
def get_user_puzzle(request,username,amount=5,page=0):
    try:
        user = User.objects.get(username=username)
        if user is not None :
            number_puzzles = DungeonData.objects.filter(userId=user.id).count()
            if number_puzzles == 0:
                return JsonResponse({'response':'No hay puzzles','status':400})
            if number_puzzles < amount*page:
                return JsonResponse({'response':'No hay mas puzzles','status':400})
            puzzles= DungeonData.objects.order_by('min_sol').filter(userId=user.id)[page*amount:amount+amount*page]
            if puzzles.exists():
                dungeons=[]
                for puzzle in puzzles:
                    dungeons.append(puzzle.prepareData())
                return JsonResponse({'response':'ok',
                                     'puzzlesData':dungeons,
                                     'status':200},safe=False)
    except Exception as e:
        return JsonResponse({'response':str(e)})
    

@ensure_csrf_cookie
@login_required
@require_GET
def get_status_puzzle(request,username):
    try:
        user = User.objects.filter(username=username)
        if user.exists():
            petition = PetitionManager.objects.filter(userId=user.id).last()
            if petition.exists():
                return JsonResponse({'response':'ok',
                                     'date':petition.date,
                                     'petition_data':petition.petition_data,
                                     'id':petition.id,
                                     'status':200},safe=False)
    except Exception as e:
        return JsonResponse({'response':str(e)})
    
@ensure_csrf_cookie
@login_required
@require_POST
def save_solution_puzzle(request,username):
    try:
        user = User.objects.get(username=username)
        if user is not None:
            params = request.body
            data = json.loads(params)
            dungeon = DungeonData.objects.get(id=data['id'])
            dungeon.solution = data['solution']
            dungeon.save()
            return JsonResponse({'response':'Solucion guardada','status':200})
    except Exception as e:
        return JsonResponse({'response':str(e)})
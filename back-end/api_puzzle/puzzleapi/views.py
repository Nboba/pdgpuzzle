from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

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
        return JsonResponse({'response':str(e)})
    
@ensure_csrf_cookie
@login_required
def postPeticionDungeon(request,username):
    params = dict(request.POST)
    try: 
        if User.objects.filter(username=username).exists() == False:
             return JsonResponse({'response':'Usuario no existe'},status=400)
        else:
            user=User.objects.get(username=username)
            if PetitionManager.objects.filter(user_id=user.id,status_p='P').exists() == True:
                return JsonResponse({'response':'Usuario tiene una peticion pendiente'},status=
                                    400)
            else:
                
                dataPetition= DataPetition(**params)
                dataPetition.save()
                dungeonPetition=PetitionManager(user_id=user,petition_data=dataPetition,status_p='pending')
                dungeonPetition.save()
                return JsonResponse({'response':'Peticion de creacion de dungeon Aceptada'},status=200)
    except Exception as e:
        return JsonResponse({'response':str(e)})  
    
@ensure_csrf_cookie   
def getDungeon(request,idUser):
    try:
        dataDungeon = list(DungeonData.objects.all().values())
        
        return JsonResponse({'DataDungeon':dataDungeon,
                                'response':'ok 200'})
    except Exception as e:
        return JsonResponse({'response':str(e)})
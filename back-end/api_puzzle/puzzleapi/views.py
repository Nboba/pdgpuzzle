from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.models import User

from .models import DataPetition,DungeonData,PetitionManager
# Create your views here.
@ensure_csrf_cookie
def getDummyDungeon(request):
    try:
        return JsonResponse({'data':DataPetition.getDungeonDummy(),
                             'response':'ok 200'})
    except Exception as e:
        return JsonResponse({'response':str(e)})
    
@ensure_csrf_cookie
def postPeticionDungeon(request,username):
    params = dict(request.GET)
    try: 
        if User.objects.filter(username=username).exists() == False:
             return JsonResponse({'response':'Usuario no existe'},status=400)
        else:
            userId=User.objects.get(username=username).id
            if PetitionManager.objects.filter(userI=userId,statusP='pending').exists() == True:
                return JsonResponse({'response':'Usuario tiene una peticion pendiente'},status=
                                    400)
            else:
                dataPetition= DataPetition(**params)
                dataPetition.save()
                petitionId=dataPetition.id
                dungeonPetition=PetitionManager(userID=userId,petitionData=petitionId)
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
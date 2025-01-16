from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import DungeonPetition,DungeonData
# Create your views here.

def getDummyDungeon(request):
    try:
        return JsonResponse({'dungeon':DungeonPetition.getDungeonDummy(),
                             'response':'ok 200'})
    except Exception as e:
        return JsonResponse({'response':str(e)})
    

""" @csrf_exempt
def getSolDungeon(request,id):
    if request.method == 'GET':
        return HttpResponse(solDungeonToJson(id))
    else:
        return HttpResponse('')
def deleteDungeon(request,id):
    if request.method == 'DELETE':
        return HttpResponse('')
    else:
        return HttpResponse('') """


def postPeticionDungeon(request):
    params = request.GET
    try:  
        dungeon= DungeonPetition(**params).dungeonjson()
        DungeonData.objects.create(dungeon=dungeon)
        dataDungeon = list(DungeonData.objects.all().values())
        return JsonResponse({'DataDungeon':dataDungeon},status=200)
    except Exception as e:
        return JsonResponse({'response':str(e)})  
    
def getDungeon(request,idUser):
    try:
        dataDungeon = list(DungeonData.objects.all().values())
        
        return JsonResponse({'DataDungeon':dataDungeon,
                                'response':'ok 200'})
    except Exception as e:
        return JsonResponse({'response':str(e)})
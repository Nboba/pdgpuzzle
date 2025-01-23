from django.http import HttpResponse
from django.http import JsonResponse

from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie,requires_csrf_token
from django.views.decorators.http import require_http_methods
import json
# Create your views here.

@ensure_csrf_cookie
@require_http_methods(["POST"])
def registerApi(request):
    try:
        data=json.loads(request.body)['userRegister']
        if len(data["username"])==0:
            return HttpResponse(content="Username is required.",status=400)
        if len(data["password"])==0:
            return HttpResponse(content="Password is required.",status=400)
        if len(data["email"])==0:
            return HttpResponse(content="Email is required.",status=400)
        if User.objects.filter(username=data['username']).exists()== True :
            return HttpResponse(content="Username already EXIST!!!.",status=400)
        if User.objects.filter(email=data['email']).exists()== True:
            return HttpResponse(content="Email already EXIST!!!.",status=400)
        else:
            user= User.objects.create_user(
                                            username=data["username"],
                                            email=data["email"]
                                            )
            user.set_password(data["password"])
            user.save()
            return JsonResponse({'response':"User created.",'status':200},safe=False)
    except  Exception as e:
        return HttpResponse(content=str(e),status=500)
    

@ensure_csrf_cookie
@require_http_methods(["POST"])
def loginApi(request):
    try:
        data=json.loads(request.body)['userLogin']
        user = authenticate(request,username=data["username"], password=data["password"])
        if user is not None:
            login(request, user)
            request.session["member_id"] = user.id
            return JsonResponse({'data':{'username':user.username,
                                 'user_id':request.session["member_id"],
                                 'session_key':request.session.session_key},
                         'message':"You're logged in.",
                         'status':200},safe=False)
        if len(data["username"])==0:
            return HttpResponse(content="Username is required.",status=400)
        if len(data["password"])==0:
            return HttpResponse(content="Password is required.",status=400)
        else:
            return HttpResponse(content="Your username OR password didn't match.",status=400)
    except User.DoesNotExist:
        return HttpResponse(content="User dont Exist.",status=400)
    
    
@require_http_methods(["POST"])  
@login_required
@ensure_csrf_cookie
def logout(request):
    try:
        del request.session["member_id"]
        return JsonResponse({'message':"You re logged out.",'status':200},safe=False)
    except KeyError:
        return HttpResponse("You're not logged in.",status=400)
    

@require_http_methods(["GET"])  
@ensure_csrf_cookie
def isUserLogged(request):
    try:
        if request.session["member_id"]:
            return JsonResponse({'message':"You're logged in.",
                         'status':200},safe=False)
    except KeyError:
        return HttpResponse("You're not logged in.")
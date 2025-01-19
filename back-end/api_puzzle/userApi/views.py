from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.db.models import Q
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
# Create your views here.

@ensure_csrf_cookie
@require_http_methods(["POST"])
def register(request):
        if request.method=="POST":
            print(request.body)
            if User.objects.filter(username=request.POST['username']).exists()== True :
                return HttpResponse("Username already EXIST!!!.")
            if User.objects.filter(email=request.POST['email']).exists()== True:
                return HttpResponse("Email already EXIST!!!.")
            else:
                user= User.objects.create_user(username=request.POST["username"],
                                            email=request.POST["email"])
                user.set_password(request.POST["password"])
                user.save()
                return HttpResponse("User created.")

@ensure_csrf_cookie
def login(request):
    try:
        user = User.objects.get(username=request.POST["username"])
        if user.check_password(request.POST["password"]):
            request.session["member_id"] = user.id
            return HttpResponse("You're logged in.")
        else:
            return HttpResponse("Your username OR password didn't match.")
    except User.DoesNotExist:
        return HttpResponse("User dont Exist.")
    
@ensure_csrf_cookie  
def logout(request):
    try:
        del request.session["member_id"]
        return HttpResponse("You're logged out.")
    except KeyError:
        return HttpResponse("You're not logged in.")
    
@ensure_csrf_cookie
def isUserLogged(request):
    try:
        if request.session["member_id"]:
            return HttpResponse("You're logged in.")
    except KeyError:
        return HttpResponse("You're not logged in.")
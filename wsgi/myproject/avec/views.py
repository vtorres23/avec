# -*- coding: utf-8 -*-
from django.shortcuts import render, render_to_response
from django.utils import timezone
from .models import Post, Subject, Themes, Keywords, Subject_detail, Reports
from django.shortcuts import render, get_object_or_404
from django.template import RequestContext
from django.http import HttpResponseRedirect # Funcao para redirecionar o usuario
from django.contrib.auth.forms import UserCreationForm # Formulario de criacao de usuarios
from django.contrib.auth.forms import AuthenticationForm # Formulario de autenticacao de usuarios
from django.contrib.auth import login # funcao que salva o usuario na sessao
from django.views.generic import View, TemplateView, CreateView
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse_lazy

User = get_user_model()


# Create your views here.
def page_not_found(request):
    # Dict to pass to template, data could come from DB query
    values_for_template = {}
    return render(request,'avec/404.html',values_for_template,status=404)

def server_error(request):
    # Dict to pass to template, data could come from DB query
    values_for_template = {}
    return render(request,'avec/404.html',values_for_template,status=500)

def bad_request(request):
    # Dict to pass to template, data could come from DB query
    values_for_template = {}
    return render(request,'avec/400.html',values_for_template,status=400)

def permission_denied(request):
    # Dict to pass to template, data could come from DB query
    values_for_template = {}
    return render(request,'avec/403.html',values_for_template,status=403)

def index(request):
    themes = Themes.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    subject = Subject.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'avec/index.html', {'subject': subject, 'themes': themes})

def ciencia_tecnologia(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'avec/ciencia_tecnologia.html', {'posts': posts})
	
def registro_civil(request):
    return render(request, 'avec/registro_civil.html')	
	
def retratos_municipais(request):
    return render(request, 'avec/dashboards/retratosmunicipais.html')	
	
def educacao(request):
    return render(request, 'avec/dashboards/educacao.html')	

def inovacao(request):
	if request.user.is_authenticated():
		return render(request, 'avec/dashboards/inovacao.html')	
	else:
		return render(request,'avec/permissao.html')

def nascidosvivos(request):
	if request.user.is_authenticated():
		return render(request, 'avec/dashboards/nascidosvivos.html')	
	else:
		return render(request,'avec/permissao.html')		

def post_detail(request, pk):
    post = Post.objects.get(pk=pk)
    mykeywords = post.keywords.all()
    myparent = post.subject.all()	
    related = Subject_detail.objects.filter(subject=myparent)
    return render(request, 'avec/post_detail.html', {'post': post, 'mykeywords' : mykeywords, 'myparent' : myparent, 'related' : related})

def reports_detail(request, pk):
    report = Reports.objects.get(pk=pk)
    myparent = report.subject.subject_detail_set.all()	
    return render(request, 'avec/reports_detail.html', {'report': report})	

def subject_detail(request, pk):
    mysubject = Subject.objects.get(pk=pk)
    mykeywords = mysubject.keywords.all()
    mysubdetail = mysubject.subject_detail_set.all()
    posts = Post.objects.filter(published_date__lte=timezone.now()).filter(subject=mysubject).order_by('published_date')    	    
    reports  = Reports.objects.filter(published_date__lte=timezone.now()).filter(subject=mysubject).order_by('published_date')
    return render(request, 'avec/subjects_detail.html', {'posts': posts, 'mysubject': mysubject, 'mykeywords': mykeywords, 'mysubdetail': mysubdetail, 'reports': reports})
	
def subsubject_detail(request, pk):
    mysubject = Subject_detail.objects.get(pk=pk)
    posts = Post.objects.filter(published_date__lte=timezone.now()).filter(subject_detail=mysubject).order_by('published_date')
    myparent = mysubject.subject.subject_detail_set.all()
    return render(request, 'avec/subsubjects_detail.html', {'mysubject': mysubject, 'posts': posts , 'myparent': myparent})	
	
def keywords_detail(request, pk):
    mykeywords = Keywords.objects.get(pk=pk)
    posts = Post.objects.filter(published_date__lte=timezone.now()).filter(keywords=mykeywords).order_by('published_date')
    return render(request, 'avec/keywords.html', {'mykeywords': mykeywords, 'posts': posts})	
	

	
# pagina de login
def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST) 
        
        if form.is_valid():
            login(request, form.get_user())
            return HttpResponseRedirect("/")
        else:
            return render(request, "avec/logar.html", {"form": form})
    
    return render(request, "avec/logar.html", {"form": AuthenticationForm()})	

def logout(request):
    request.session.items = []
    request.session.modified = True
    logout(request)	
	
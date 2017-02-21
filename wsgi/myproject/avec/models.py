# -*- coding: utf-8 -*-
from django.db import models
from django.utils import timezone


class Keywords(models.Model):
    title = models.CharField(max_length=200)
    
    def publish_keyword(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title	

class Themes(models.Model):
    #author = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=200)
    image = models.ImageField( blank=True)
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)

    def publish_theme(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
		
class Subject(models.Model):
    #author = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=200)
    text = models.TextField()
    image = models.ImageField( blank=True)
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)
    keywords = models.ManyToManyField(Keywords, blank=True)
    theme = models.ForeignKey(Themes)
	
    def publish_subject(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title	

class Subject_detail(models.Model):
    #author = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)
    keywords = models.ManyToManyField(Keywords, blank=True)
    subject = models.ForeignKey(Subject)
	
    def publish_subject_detail(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title			

class Post(models.Model):
    #author = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=200)
    text = models.TextField()
    html = models.TextField(blank=True)
    image = models.ImageField( blank=True)
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)
    subject = models.ManyToManyField(Subject , related_name='subparent')			
    subject_detail = models.ManyToManyField(Subject_detail , related_name='subchild')
    keywords = models.ManyToManyField(Keywords, blank=True)

	
    def publish_post(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title

class Reports(models.Model):
    #author = models.ForeignKey(settings.AUTH_USER_MODEL)
    title = models.CharField(max_length=200)
    text = models.TextField()
    pdf = models.FileField(upload_to='pdf')
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)
    subject = models.ManyToManyField(Subject , related_name='subparent1')
    subject_detail = models.ManyToManyField(Subject_detail , related_name='subchild1')
    keywords = models.ManyToManyField(Keywords, blank=True)


    def publish_report(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title


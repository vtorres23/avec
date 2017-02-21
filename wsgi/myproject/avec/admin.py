# -*- coding: utf-8 -*-
from django.contrib import admin
from .models import Post, Subject, Themes, Keywords, Subject_detail, Reports

admin.site.register(Post)
admin.site.register(Reports)
admin.site.register(Subject)
admin.site.register(Subject_detail)
admin.site.register(Themes)
admin.site.register(Keywords)

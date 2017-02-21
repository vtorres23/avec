# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('avec', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='author',
        ),
        migrations.RemoveField(
            model_name='reports',
            name='author',
        ),
        migrations.RemoveField(
            model_name='subject',
            name='author',
        ),
        migrations.RemoveField(
            model_name='subject_detail',
            name='author',
        ),
        migrations.RemoveField(
            model_name='themes',
            name='author',
        ),
    ]

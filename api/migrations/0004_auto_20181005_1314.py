# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-10-05 13:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20181005_1258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
# Generated by Django 3.2.25 on 2024-09-19 02:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('calendars', '0004_event_gender'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='gender',
        ),
    ]

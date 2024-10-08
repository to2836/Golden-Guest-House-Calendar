# Generated by Django 3.2.25 on 2024-09-18 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendars', '0002_alter_event_room_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='staying_number',
        ),
        migrations.AddField(
            model_name='event',
            name='on_site_payment',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='event',
            name='remarks',
            field=models.TextField(blank=True),
        ),
    ]

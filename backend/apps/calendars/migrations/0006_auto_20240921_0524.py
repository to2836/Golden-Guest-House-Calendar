# Generated by Django 3.2.25 on 2024-09-21 05:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendars', '0005_remove_event_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='check_in_status',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='event',
            name='agent',
            field=models.CharField(choices=[('AGODA', 'Agoda'), ('EXPEDIA', 'Expedia'), ('TRIP_DOT_COM', 'Trip.com'), ('AIRBNB', 'Airbnb'), ('GOLDEN_GUEST_HOUSE', 'Golden Guest House')], max_length=255),
        ),
        migrations.AlterField(
            model_name='event',
            name='room_name',
            field=models.CharField(choices=[('NAGASAKI', '長崎'), ('FUKUOKA', '福岡'), ('KUMAMOTO', '熊本'), ('OOITA', '大分'), ('KAGOSHIMA', '鹿児島'), ('MIYAZAKI', '宮崎'), ('SEOUL', 'ソウル')], max_length=255),
        ),
        migrations.AlterField(
            model_name='event',
            name='status',
            field=models.CharField(choices=[('RESERVED', '예약'), ('CANCEL', '취소'), ('NOSHOW', '노쇼')], max_length=255),
        ),
    ]

from django.contrib import admin
from .models import Event

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    search_fields = ['booking_id', 'agent', 'reservation_name']
    list_display = ['booking_id', 'reservation_name', 'agent', 'check_in', 'check_out']


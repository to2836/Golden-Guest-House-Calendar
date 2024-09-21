from django.db import models
from core.constants import BookingStatusConstant, AgentConstant, RoomNameConstant, GenderConstant

class Event(models.Model):

    booking_id       = models.CharField(max_length=255)
    agent            = models.CharField(max_length=255, choices=AgentConstant.TYPE)
    reservation_name = models.CharField(max_length=255)
    check_in         = models.DateField()
    check_out        = models.DateField()
    room_name        = models.CharField(max_length=255, choices=RoomNameConstant.TYPE)
    status           = models.CharField(max_length=255, choices=BookingStatusConstant.TYPE)
    amount           = models.IntegerField(default=0)
    on_site_payment  = models.BooleanField(default=False)
    remarks          = models.TextField(blank=True)
    check_in_status  = models.BooleanField(default=False)
    # gender           = models.CharField(max_length=255, choices=GenderConstant.TYPE, default=GenderConstant.MAN)

    class Meta:
        verbose_name_plural = 'Event'
    
    def __str__(self):
        return f'{self.reservation_name} ({self.agent})'









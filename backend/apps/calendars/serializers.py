from datetime import datetime
from rest_framework import serializers
from .models import Event
from core.constants import BookingStatusConstant, RoomNameConstant, AgentConstant


class EventSerializer(serializers.ModelSerializer):
    status_display_name = serializers.SerializerMethodField()
    room_display_name = serializers.SerializerMethodField()
    agent_display_name = serializers.SerializerMethodField()
    

    class Meta:
        model = Event
        fields = '__all__'

    
    def get_status_display_name(self, obj):
        for _value, _display_name in BookingStatusConstant.TYPE:
            if obj.status == _value:
                return _display_name
    
    def get_room_display_name(self, obj):
        for _value, _display_name in RoomNameConstant.TYPE:
            if obj.room_name == _value:
                return _display_name

    def get_agent_display_name(self, obj):
        for _value, _display_name in AgentConstant.TYPE:
            if obj.agent == _value:
                return _display_name

import json
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

import os
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from django.conf import settings
from httplib2 import Credentials
from calendars.serializers import EventSerializer
from calendars.models import Event
from core.constants import BookingStatusConstant


SCOPES = [
    "https://www.googleapis.com/auth/calendar"
]

class GoogleCalendarRetriveView(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, *args, **kwarg):
        creds = None
         # Check if token file exists
        if os.path.exists(settings.GOOGLE_TOKEN_FILE):
            creds = Credentials.from_authorized_user_file(settings.GOOGLE_TOKEN_FILE)
        
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    settings.GOOGLE_CLIENT_SECRET_FILE, SCOPES)  
                creds = flow.run_local_server(port=8001)

            # Save the credentials for the next run
            with open(settings.GOOGLE_TOKEN_FILE, 'w') as token:
                token.write(creds.to_json())

            print(f'[*] creds : {creds}')
    


        return Response(status=200)

class CalendarEventListCreateView(APIView):
    permission_classes = (IsAuthenticated, )
    parser_classes = (JSONParser, )

    def get(self, request):
        date_str = self.request.query_params.get('date')
        date_obj = datetime.strptime(date_str, "%Y-%m")
        six_months_before = date_obj - relativedelta(months=6)
        six_months_after = date_obj + relativedelta(months=6)

        events = Event.objects.filter(check_in__gte=six_months_before, check_out__lte=six_months_after)


        return Response(EventSerializer(events, many=True).data, status=200)

    def post(self, request, *args, **kwargs):
        check_in_str = request.data['check_in']
        check_in_obj = datetime.strptime(check_in_str, '%Y-%m-%d').date()
        request.data['check_in'] = check_in_obj

        check_out_str = request.data['check_out']
        check_out_obj = datetime.strptime(check_out_str, '%Y-%m-%d').date()
        request.data['check_out'] = check_out_obj

        serializer = EventSerializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=400)
        serializer.save()


        return Response(status=200)


class CalendarEventUpdateDeleteView(APIView):
    permission_classes = (IsAuthenticated, )
    parser_classes = (JSONParser, )

    def patch(self, request, pk, *args, **kwargs):
        bulk = request.data.pop('bulk')

        if bulk:
            event_objs = Event.objects.filter(booking_id=request.data['booking_id'])
            # print(f'request.data : {request.data}')

            for event_obj in event_objs:
                serializer = EventSerializer(event_obj, data=request.data, partial=True)
                if not serializer.is_valid():
                    print(serializer.errors)
                    return Response(serializer.errors, status=400)
                serializer.save()
            
        else:
            event_obj = Event.objects.get(pk=pk)
            serializer = EventSerializer(event_obj, data=request.data, partial=True)
            if not serializer.is_valid():
                print(serializer.errors)
                return Response(serializer.errors, status=400)
            serializer.save()
        
        return Response(status=200)

    def delete(self, request, pk, *args, **kwargs):
        bulk = self.request.query_params.get('bulk')
        event_obj = Event.objects.get(pk=pk)
        if json.loads(bulk):
            Event.objects.filter(booking_id=event_obj.booking_id).delete()
        else:
            Event.objects.filter(pk=pk).delete()
        
        return Response(status=200)


class CalendarEventCopyCreateView(APIView):
    permission_classes = (IsAuthenticated, )
    parser_classes = (JSONParser, )

    def post(self, request, pk, *args, **kwargs):
        copy_num = request.data['copy_num']
        event_obj = Event.objects.get(pk=pk)
        event_data_list = []

        for _ in range(0, int(copy_num)):
            event_data_list.append(EventSerializer(event_obj).data)
        
        
        serializer = EventSerializer(data=event_data_list, many=True)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=400)
        
        serializer.save()
        return Response(status=200)

import pytz
class OverBookingListView(APIView):
    permission_classes = (IsAuthenticated, )
    parser_classes = (JSONParser, )

    def get(self, request):
        kst = pytz.timezone('Asia/Seoul')
        today = datetime.now(kst).date()

        latest_date = Event.objects.order_by('-check_out').first().check_out

        date_list = []
        # 두 날짜 사이의 차이 계산
        delta = (latest_date - today).days
        
        # 날짜 리스트에 모든 날짜 추가
        over_booking_cnt = 0
        warning_cnt = 0
        for i in range(delta):  # +1은 끝날짜 포함을 위함
            day = today + timedelta(days=i)
            count = Event.objects.filter(check_in__lte=day, check_out__gt=day, status=BookingStatusConstant.RESERVED).count()
            if count >= 27:
                if (27 <= count and count <= 29):
                    _type = 'WARNING'
                    warning_cnt += 1
                else:
                    _type = 'OVER_BOOKING'
                    over_booking_cnt += 1
                
                date_list.append({
                    'count': count,
                    'type': _type,
                    'date': day
                })
        
        return Response({'data': date_list, 'over_booking_cnt':over_booking_cnt, 'warning_cnt': warning_cnt}, status=200)

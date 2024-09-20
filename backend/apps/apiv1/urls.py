from django.urls import re_path
from .views.calendars import GoogleCalendarRetriveView
from .views.users import SigninView, LogoutView
from .views.calendars import CalendarEventListCreateView

app_name = 'apiv1'
urlpatterns = [
    re_path(r'^users/signin?$', SigninView.as_view()),
    re_path(r'^users/logout/?$', LogoutView.as_view()),
    re_path(r'^calendar-data?$', GoogleCalendarRetriveView.as_view()),
    re_path(r'^calendars/event?$', CalendarEventListCreateView.as_view()),

    
]
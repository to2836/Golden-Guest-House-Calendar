from django.urls import re_path
from .views.calendars import GoogleCalendarRetriveView
from .views.users import SigninView, LogoutView
from .views.calendars import CalendarEventListCreateView, CalendarEventUpdateDeleteView, CalendarEventCopyCreateView, \
OverBookingListView

app_name = 'apiv1'
urlpatterns = [
    re_path(r'^users/signin?$', SigninView.as_view()),
    re_path(r'^users/logout/?$', LogoutView.as_view()),
    re_path(r'^calendar-data?$', GoogleCalendarRetriveView.as_view()),
    re_path(r'^calendars/events?$', CalendarEventListCreateView.as_view()),
    re_path(r'^calendars/events/(?P<pk>[0-9]+)?$', CalendarEventUpdateDeleteView.as_view()),
    re_path(r'^calendars/events/(?P<pk>[0-9]+)/copy?$', CalendarEventCopyCreateView.as_view()),
    re_path(r'^calendars/events/over-booking?$', OverBookingListView.as_view()),
]
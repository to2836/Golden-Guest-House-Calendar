from .base import *


# DATABASE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': get_env_variable('DB_NAME'),
        'USER': get_env_variable('DB_USER'),
        'PASSWORD': get_env_variable('DB_PASSWD'),
        'HOST': get_env_variable('DB_HOST'),
        'PORT': get_env_variable('DB_PORT'),
    }
}
DATABASES['default']['ATOMIC_REQUESTS'] = True

GOOGLE_CALENDAR = {
    'CALENDAR_ID': get_env_variable('GOOGLE_CALENDAR_ID'),
    'CLIENT_ID': get_env_variable('GOOGLE_CALENDAR_CLIENT_ID'),
    'CLIENT_SECRET': get_env_variable('GOOGLE_CALENDAR_CLIENT_SECRET')
}
from .base import *


# DATABASE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
    }
}
DATABASES['default']['ATOMIC_REQUESTS'] = True
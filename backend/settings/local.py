from .base import *


env = environ.Env(
    DEBUG=(bool, False)
)

environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

GOOGLE_CALENDAR = {
    'CALENDAR_ID': env('GOOGLE_CALENDAR_ID'),
    'CLIENT_ID': env('GOOGLE_CALENDAR_CLIENT_ID'),
    'CLIENT_SECRET': env('GOOGLE_CALENDAR_CLIENT_SECRET')
}
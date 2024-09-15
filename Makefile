clean_cache:
	@find . -name \*.pyc -delete
	@find . -name \*.pyo -delete
	
runserver: clean_cache
	python3.8 manage.py runserver 0.0.0.0:8000

superuser:
	python3.8 manage.py createsuperuser

migrate:
	python3.8 manage.py migrate

makemigrations:
	python3.8 manage.py makemigrations

req:
	pip freeze > requirements.txt
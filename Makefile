clean_cache:
	@find . -name \*.pyc -delete
	@find . -name \*.pyo -delete
	
runserver: clean_cache
	python3 manage.py runserver

superuser:
	python3 manage.py createsuperuser

migrate:
	python3 manage.py migrate

makemigrations:
	python3 manage.py makemigrations

req:
	pip freeze > requirements.txt
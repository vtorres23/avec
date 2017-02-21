.PHONY: setup run venv

setup: venv

venv:
	virtualenv --python=python2.7 venv
	pip install --no-deps -r requirements.txt
	python wsgi/myproject/manage.py makemigrations
	python wsgi/myproject/manage.py migrate

run:
	python wsgi/myproject/manage.py runserver

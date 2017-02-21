.PHONY: setup run venv

setup: venv

venv:
	venv/bin/pip install virtualenv
	virtualenv --python=python2.7 venv
	venv/bin/pip install --no-deps -r requirements.txt
	venv/bin/python wsgi/myproject/manage.py makemigrations
	venv/bin/python wsgi/myproject/manage.py migrate

run:
	venv/bin/python wsgi/myproject/manage.py runserver

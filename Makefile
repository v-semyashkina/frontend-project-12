.PHONY: start-server start-frontend start

start-server-dev:
	npx start-server

start-frontend-dev:
	cd frontend && npm run dev

start-dev:
	$(MAKE) start-server-dev & \
	$(MAKE) start-frontend-dev

lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/dist

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/dist
	npm run build
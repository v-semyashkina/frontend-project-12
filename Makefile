.PHONY: start-server start-frontend start

start-server-dev:
	npx start-server

start-frontend-dev:
	cd frontend && npm run dev

start-dev:
	$(MAKE) start-server-dev & \
	$(MAKE) start-frontend-dev

install:
	npm ci

build:
	rm -rf frontend/dist
	npm run build

start-frontend:
	make -C frontend start	

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend

develop:
	make start-backend & make start-frontend
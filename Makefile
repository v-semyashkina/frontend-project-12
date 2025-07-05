install:
	npm ci
	
build:
	rm -rf frontend/dist
	npm run build

start-backend:
	npx start-server -s ./frontend/dist

start:
	make start-backend
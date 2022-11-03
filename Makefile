-include .env  # ファイルが見つからなくてもエラーにしない外部 Makefile 読み込み。.env.a を変数を定義するだけの Makefile と考えて読み込み

up:
	docker-compose up -d 

build:
	docker-compose up -d --build
	docker-compose exec laravel composer install
	docker-compose exec laravel cp .env.example .env
	docker-compose exec laravel php artisan key:generate
	docker-compose exec laravel php artisan storage:link
	docker-compose exec laravel chmod -R 777 storage bootstrap/cache

init:
	cp .env.example .env
	docker-compose up -d --build
	docker-compose exec laravel composer install
	docker-compose exec laravel cp .env.example .env
	docker-compose exec laravel php artisan key:generate
	docker-compose exec laravel php artisan storage:link
	docker-compose exec laravel chmod -R 777 storage bootstrap/cache
	@make cache
	@make fresh
	
down:
	docker-compose down --remove-orphans

stop:
	docker-compose stop

ps:
	docker-compose ps

.PHONY:laravel
laravel:
	docker-compose exec laravel /bin/sh

web:
	docker-compose exec web /bin/sh

sql:
	docker-compose exec mysql /bin/sh -c 'mysql -u ${DB_USER} -p${DB_PASSWORD}'

migrate:
	docker-compose exec laravel php artisan migrate

fresh:
	docker-compose exec laravel php artisan migrate:fresh --seed

seed:
	docker-compose exec laravel php artisan db:seed

cache:
	docker-compose exec laravel composer dump-autoload -o
	docker-compose exec laravel php artisan optimize
	docker-compose exec laravel php artisan event:cache
	docker-compose exec laravel php artisan view:cache
	docker-compose exec laravel php artisan config:cache
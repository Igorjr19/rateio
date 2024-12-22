build:
	docker compose --project-name rateio build

up:
	docker compose --project-name rateio up -d

down:
	docker compose --project-name rateio down

logs:
	docker compose --project-name rateio logs -f

down-clear:
	docker compose --project-name rateio down --rmi all --volumes --remove-orphans
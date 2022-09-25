# Primeiros passos para setup

## Database - Postgres
docker run -d -p 5432:5432 --name fiap_finances-db  -v "fiap_finances_db:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=root -e PRIMARY_USER=postgres postgres

# Primeiros passos para setup

## Database - Postgres
docker run --name fiap_finances-db -e POSTGRES_PASSWORD=root -p 5432:5432 -d
postgres

npx prisma db seed

## Error in NPM
Caso dê algum erro com os pacotes ao executar o projeto, rodar o comando npm ci

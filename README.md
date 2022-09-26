## 🧪 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

# Primeiros passos para setup

Clone o projeto e acesse a pasta

```bash
$ git clone https://github.com/Vitor-Franco/fiap-finances-api.git && cd fiap-finances-api
```

Após isso, siga o passo-a-passo.

### Banco de dados

Caso você precise configurar o banco de dados, recomendamos utilizar o docker.

```bash
# Database - Postgres
$ docker run -d -p 5432:5432 --name fiap_finances-db  -v "fiap_finances_db:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=root -e PRIMARY_USER=postgres postgres
```

Pronto! Seu container docker já deve estar rodando. Por fim, basta configurar a url do seu banco de dados no arquivos .env do projeto.

```js
// Exemplo de string de conexão.
DATABASE_URL="postgresql://postgres:root@localhost:5432/fiap_finances-db?schema=public"
```

### Aplicação

```bash
# Instale as dependências, (necessário node na versão >= 14)
$ npm i

# Rode as migrations do projeto
$ npx prisma migrate deploy

# Inicie a aplicação
$ npm run dev
```



### Erros no NPM
Caso dê algum erro com os pacotes ao executar o projeto, rodar o comando

```bash
$ npm ci
```

# Development environment setup

## Required installed tools (latest LTS)

- Nodejs
- Docker and docker-compose

## Initialize

```
npm install
```

## Database

To start the development postgresql database: (or use your own installed version)

```
docker-compose up -d
```

Database is managed using [prisma](https://www.prisma.io/docs/).

Database admin UI: http://localhost:8080/?pgsql=db  
Prisma studio: npx prisma studio

### DB Schema change

tldr; In the dev environments:

1. Make your db schema changes in `./prisma/schema.prisma`
2. Run `npx prisma migrate dev --create-only --preview-feature` and provide a name for the migration. This will create a draft migration.  
   Check the created migration (in `./prisma/migrations/`), make changes if needed.
3. Run `npm run configure-db` (or `npx prisma migrate dev --preview-feature`) to apply changes.

In production this would be different.

Read more about [migration flows in Prisma docs](https://www.prisma.io/docs/concepts/components/prisma-migrate/prisma-migrate-flows/)

## Dev server

```
npm start
```

This will automatically run `npm run configure-db` from the npm `prestart` script to apply db changes if there is any.

KNOWN BUG: There is currently a bug in dev server that requires manual server restart when changing `.gql` files. Type rs in the console and press enter and it will restart the server.

### Authentication

#### Local

Local strategy is using JWT token and Authorization Bearer header.

Use Graphql login mutation and send required fields. (email, password) You will receive a token. Use the token for accessing secure grahpql nodes (or routes) by providing `Authorization: Bearer` in the request header like: `{ "authorization": "Bearer JWTTOKEN" }`.

## Tests

To run tests:

Use the alternative docker compose file to fire up the db:

```
docker-compose -f docker-compose.tests.yml up -d
```

Run `npm run test`

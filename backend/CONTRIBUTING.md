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

### Authentication

#### Local strategy

Local strategy is using JWT token and Authorization Bearer header.

Post username and password as `application/x-www-form-urlencoded` or `application/json` to `\login` and you will receive a token in a JSON response. Like: `{ "token": "JWTTOKEN" }`.  
Then use the token for accessing secure grahpql nodes (or routes) by providing `Authorization: Bearer` in the request header like: `{ "Authorization": "Bearer JWTTOKEN" }`.

Sample:

```js
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("username", "YOUR_USERNAME"); // Change this
urlencoded.append("password", "YOUR_PASSWORD"); // Change this

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: urlencoded,
};

fetch("http://localhost:3000/login", requestOptions)
  .then((response) => response.json())
  .then((result) =>
    console.log(`{ "Authorization": "Bearer ${result.token}" }`)
  ) // paste this to graphql playground http headers section
  .catch((error) => console.log("error", error));
```

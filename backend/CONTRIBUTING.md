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

## Dev server

```
npm start
```

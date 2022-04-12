## Getting started:

Create env file: `cp .env.example .env`

-   Have 2 way run project

1.  Run dokcer combined run node local: (recommend to dev mode)

-   `docker compose -f docker-compose.dev.yml up mysql adminer_mysql redis`

Run project:

-   `npx prisma migrate dev`
-   `npm run dev`

2. Run project entirely in docker

-   `docker compose -f docker-compose.dev.yml up`

Note:

-   Using `npm`

## TODO:

-   [x] Use npm instead of yarn
-   [ ] Move user auth on api request to redis
-   [ ] Add social login support
-   [ ] Add swagger

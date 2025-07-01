# GScore App


### Score Search Page
![template example](./support/screenshots/search-page.png)


### Level Report Page
![template example](./support/screenshots/report-page.png)


### Top Student Page
![template example](./support/screenshots/top-page.png)

Technology:
- Frontend: NextJS 15 App Router + Shadcn Design Library
- Backend: NestJS 11 + TypeORM Library
- Database: MySQL 9
- Platform: Node version 20.18.1


How to run the font-end app locally
- `cd frontend`
- `npm run dev` or `yarn dev`


How to run the backend-end app locally
- `cd backend`
- `npm run dev` or `yarn dev`


About .env:
- This is a sample app without sensitive information, so I push them on repository


Notice:
- Should use `20.18.1` to run seamlessly


Orientation:
- Use Redis-based Caching to fetch tops student and reports quickly
- Use Rate Limiting to restrict abuse of customer

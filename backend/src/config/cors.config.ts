export const corsConfig = {
    origin: ['http://localhost:3000', 'https://gcore-app.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
}
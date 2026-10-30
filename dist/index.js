import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import restaurants from './routes/restaurants.js';
import cities from './routes/cities.js';
const app = new Hono();
app.route('/restaurants', restaurants);
app.route('/cities', cities);
app.get('/', async (c) => {
    return c.json({
        ok: true,
        message: "API is up!"
    });
});
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});

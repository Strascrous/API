import { Hono } from "hono";
import { fetchRestaurantsList } from "../services/restaurants.js";
import { cities } from "../domain/cities.js";

const citiesRoutes = new Hono();

citiesRoutes.get("/", async (c): Promise<Response> => {
    return c.json({
        ok: true,
        message: `Voici la liste des villes`,
        data: cities.map((c) => ({ id: c.id, name: c.name }))
    });
});

export default citiesRoutes;

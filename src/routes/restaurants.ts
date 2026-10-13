import { Hono } from "hono";
import { citiesIds } from "../domain/cities.js";
import { fetchMenuList, fetchRestaurantsList } from "../services/restaurants.js";

const restaurants = new Hono();

restaurants.get("/", async (c): Promise<Response> => {
    const city = c.req.query("city");
    if (!city || !citiesIds.includes(city)) {
        return c.json({
            ok: false,
            message: "Ville inconnue."
        }, 404);
    }

    try {
        let restaurants = await fetchRestaurantsList(city);

        return c.json({
            ok: true,
            message: `Voici la liste des restaurants CROUS de ${city}`,
            data: restaurants
        });
    } catch (e) {
        return c.json({
            ok: false,
            message: "Une erreur s'est produite coté serveur"
        }, 500);
    }
})

restaurants.get("/:id", async (c): Promise<Response> => {
    const id = c.req.param("id");
    const city = c.req.query("city");
    if (!city || !citiesIds.includes(city)) {
        return c.json({
            ok: false,
            message: "Ville inconnue."
        }, 404);
    }

    const restaurantId = Number(id);
    if (!Number.isSafeInteger(restaurantId)) return c.json({
        ok: false,
        message: "L'identifiant est trop grand."
    }, 400);

    try {
        let menus = await fetchMenuList(city, restaurantId);

        return c.json({
            ok: true,
            message: `Voici la liste des menu du restaurant n°${restaurantId}`,
            data: menus
        });
    } catch (e) {
        return c.json({
            ok: false,
            message: "Une erreur s'est produite coté serveur"
        }, 500);
    }
})

export default restaurants;

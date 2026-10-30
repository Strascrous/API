import { Hono } from "hono";
import { citiesIds } from "../domain/cities.js";
import { fetchMenuList, fetchRestaurantsList } from "../services/restaurants.js";
import { getMenuInCache, saveMenuInCache } from "../repositories/menus.js";
import { getRestaurantsInCache, saveRestaurantsInCache } from "../repositories/restaurants.js";

const restaurants = new Hono();

restaurants.get("/", async (c): Promise<Response> => {
    const city = c.req.query("city");
    if (!city || !citiesIds.includes(city)) {
        return c.json({
            ok: false,
            message: "Ville inconnue."
        }, 404);
    }

    let cache = await getRestaurantsInCache(city);
    if (cache != null) return c.json({
        ok: true,
        message: `Voici la liste des restaurants CROUS de ${city}`,
        data: {
            restaurants: cache
        }
    });

    try {
        let restaurants = await fetchRestaurantsList(city);
        saveRestaurantsInCache(city, restaurants)

        return c.json({
            ok: true,
            message: `Voici la liste des restaurants CROUS de ${city}`,
            data: {
                restaurants
            }
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

    let cache = await getMenuInCache(city, restaurantId);
    if (cache != null) return c.json({
        ok: true,
        message: `Voici la liste des menu du restaurant n°${restaurantId}`,
        data: {
            menus: cache
        }
    });

    try {
        let menus = await fetchMenuList(city, restaurantId);
        saveMenuInCache(city, restaurantId, menus)

        return c.json({
            ok: true,
            message: `Voici la liste des menu du restaurant n°${restaurantId}`,
            data: {
                menus
            }
        });
    } catch (e) {
        return c.json({
            ok: false,
            message: "Une erreur s'est produite coté serveur"
        }, 500);
    }
})

export default restaurants;

import { Hono } from "hono";
import { citiesIds } from "@strascrous/data";
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

    let cache = await getMenuInCache(id);
    if (cache != null) return c.json({
        ok: true,
        message: `Voici la liste des menus de ce restaurant`,
        data: {
            menus: cache
        }
    });

    try {
        let menus = await fetchMenuList(id);
        saveMenuInCache(id, menus)

        return c.json({
            ok: true,
            message: `Voici la liste des menus de ce restaurant`,
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

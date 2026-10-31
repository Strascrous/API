import { fetchCROUSMobile, fetchCROUSStats } from "./client.js"
import type { Menu, MenuItem, Restaurant, RestaurantType, Stats } from "./models.js";

export async function fetchRestaurants(options: {
    academy: string,
    areas: Array<string>
}) {
    const restaurants: Array<Restaurant> = [];
    let raw = await fetchCROUSMobile(options.academy);

    for (const r of raw.restaurants) {
        let _type: RestaurantType = "unknown";
        switch (r.type.toLowerCase()) {
            case "restaurant":
                _type = "restaurant";
                break;
            case "cafétéria":
                _type = "cafeteria";
                break;
        }

        if (!options.areas.includes(r.area) || _type === "unknown") continue;

        restaurants.push({
            id: r.id,
            title: r.title.trim(),
            type: _type
        });
    }

    return restaurants;
}

export async function fetchMenu(options: {
    academy: string;
    restaurant: number;
}): Promise<Array<Menu>> {
    let raw = await fetchCROUSMobile(options.academy);

    const menus: Array<Menu> = [];
    let restaurant = raw.restaurants.find((r: { id: number; }) => r.id === options.restaurant);
    if (!restaurant) return [];

    for (const m of restaurant.menus) {
        let menu: Menu = {
            date: m.date,
            noon: [],
            evening: []
        };

        for (const meal of m.meal) {
            let key: "unknown" | "noon" | "evening" = "unknown";
            switch (meal.name) {
                case "midi":
                    key = "noon";
                    break;
                case "soir":
                    key = "evening";
                    break;
                default:
                    continue;
            }

            for (const f of meal.foodcategory) {
                let item: MenuItem = {
                    title: f.name.trim(),
                    elements: []
                }

                if (item.title.toLowerCase() === "fermeture") continue;

                for (const d of f.dishes) {
                    item.elements.push(d.name.trim());
                }

                menu[key].push(item);
            }
        }

        if (menu.noon.length === 0 && menu.evening.length === 0) continue;

        menus.push(menu);
    }

    return menus;
}

export async function fetchStats(id: string): Promise<Stats> {
    let raw = await fetchCROUSStats(id);

    return {
        updatedAt: raw.majLe,
        meals: raw.lieux[0].repas,
        max: raw.lieux[0].jauge,
        percent: raw.lieux[0].pourcentageRestant
    }
}

import { fetchCROUS } from "./client.js"
import type { Menu, MenuItem, Restaurant, RestaurantType } from "./models.js";

export async function fetchRestaurants(options: {
    academy: string,
    area: string
}) {
    const restaurants: Array<Restaurant> = [];
    let raw = await fetchCROUS(options.academy);

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

        if (r.area !== options.area || _type === "unknown") continue;

        restaurants.push({
            id: r.id,
            title: r.title,
            type: _type
        });
    }

    return restaurants;
}

export async function fetchMenu(options: {
    academy: string;
    restaurant: number;
}): Promise<Array<Menu>> {
    let raw = await fetchCROUS(options.academy);

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
                    title: f.name,
                    elements: []
                }

                for (const d of f.dishes) {
                    item.elements.push(d.name);
                }

                menu[key].push(item);
            }
        }

        menus.push(menu);
    }

    return menus;
}

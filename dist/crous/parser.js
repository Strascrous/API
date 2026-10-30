import { fetchCROUSMobile, fetchCROUSStats } from "./client.js";
export async function fetchRestaurants(options) {
    const restaurants = [];
    let raw = await fetchCROUSMobile(options.academy);
    for (const r of raw.restaurants) {
        let _type = "unknown";
        switch (r.type.toLowerCase()) {
            case "restaurant":
                _type = "restaurant";
                break;
            case "cafétéria":
                _type = "cafeteria";
                break;
        }
        if (r.area !== options.area || _type === "unknown")
            continue;
        restaurants.push({
            id: r.id,
            title: r.title,
            type: _type
        });
    }
    return restaurants;
}
export async function fetchMenu(options) {
    let raw = await fetchCROUSMobile(options.academy);
    const menus = [];
    let restaurant = raw.restaurants.find((r) => r.id === options.restaurant);
    if (!restaurant)
        return [];
    for (const m of restaurant.menus) {
        let menu = {
            date: m.date,
            noon: [],
            evening: []
        };
        for (const meal of m.meal) {
            let key = "unknown";
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
                let item = {
                    title: f.name,
                    elements: []
                };
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
export async function fetchStats(id) {
    let raw = await fetchCROUSStats(id);
    return {
        updatedAt: raw.majLe,
        meals: raw.lieux[0].repas,
        max: raw.lieux[0].jauge,
        percent: raw.lieux[0].pourcentageRestant
    };
}

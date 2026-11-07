import { decodeHTML } from "../helpers/html.js";
import { fetchCROUSMobile, fetchCROUSStats } from "./client.js"
import type { Menu, MenuItem, Payment, Restaurant, RestaurantType, Stats } from "./models.js";

export async function fetchRestaurants(options: {
    academy: string,
    areas: Array<string>,
    exactCity?: string,
    exactCities?: Array<string>
}) {
    const restaurants: Array<Restaurant> = [];
    let raw = await fetchCROUSMobile(options.academy);

    for (const r of raw.restaurants) {
        r.adresse = r.adresse.trim().toLowerCase();
        if (!options.areas.includes(r.area.trim())) continue;
        if (options.exactCities && !options.exactCities.some(city => r.adresse.includes(city.toLowerCase()))) continue;
        if (options.exactCity && !r.adresse.includes(options.exactCity.toLowerCase())) continue;

        let _type: RestaurantType = "unknown";
        switch (r.type.toLowerCase().trim().split(" ", 1)[0]) {
            case "restaurant":
                _type = "restaurant";
                break;
            case "cafétéria":
                _type = "cafeteria";
                break;
        }
        if (_type === "unknown") continue;

        let payments: Array<Payment> = [];
        let additionalPayments: Array<string> = [];

        for (const p of r.payment) {
            switch (p.name.toLowerCase()) {
                case "carte bancaire":
                    payments.push("cb")
                    break;
                case "izly":
                    payments.push("izly");
                    break;
                case "espèce":
                case "espece":
                    payments.push("espece");
                    break;
                case "moneo":
                case "monéo":
                    payments.push("moneo");
                    break;
                default:
                    additionalPayments.push(p.name);
                    break;
            }
        }

        restaurants.push({
            id: r.id,
            title: r.title.trim(),
            description: decodeHTML(r.description),
            type: _type,

            details: {
                hours: decodeHTML(r.operationalhours),
                address: decodeHTML(r.adresse),
                access: decodeHTML(r.access),
                payments: payments,
                additional_payments: additionalPayments,

                wifi: r.wifi,
                pmr: r.accessibility
            }
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

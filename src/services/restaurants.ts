import type { Menu, Restaurant, RestaurantAPI } from "../crous/models.js";
import { fetchMenu, fetchRestaurants } from "../crous/parser.js";
import { findCityById, validAcademies, type CityId } from "../domain/cities.js";
import { decodeRestaurantId, encodeRestaurantId } from "../helpers/ids.js";

export async function fetchRestaurantsList(city: CityId): Promise<Array<RestaurantAPI>> {
    let cityInfo = findCityById(city);
    if (!cityInfo) return [];

    let list = await fetchRestaurants({
        academy: cityInfo.academy,
        areas: cityInfo.areas
    });

    return list.map((r): RestaurantAPI => ({
        ...r,
        id: encodeRestaurantId(r.id, cityInfo.academy)
    }));
}

export async function fetchMenuList(id: string): Promise<Array<Menu>> {
    let data = decodeRestaurantId(id);
    if (data === null || !validAcademies.has(data.academy)) return [];

    return await fetchMenu({
        academy: data.academy,
        restaurant: data.restaurantId
    });
}

// TODO: statistiques (on sait même pas si ça va revenir)

import type { Restaurant } from "../crous/models.js";
import { fetchMenu, fetchRestaurants } from "../crous/parser.js";
import { findCityById, type CityId } from "../domain/cities.js";

export async function fetchRestaurantsList(city: CityId): Promise<Array<Restaurant>> {
    let cityInfo = findCityById(city);
    if (!cityInfo) return [];

    return await fetchRestaurants({
        academy: cityInfo.academy,
        area: cityInfo.area
    })
}

export async function fetchMenuList(city: CityId, restaurant: number) {
    let cityInfo = findCityById(city);
    if (!cityInfo) return [];

    return await fetchMenu({
        academy: cityInfo.academy,
        restaurant: restaurant
    });
}

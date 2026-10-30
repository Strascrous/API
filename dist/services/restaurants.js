import { fetchMenu, fetchRestaurants } from "../crous/parser.js";
import { findCityById } from "../domain/cities.js";
export async function fetchRestaurantsList(city) {
    let cityInfo = findCityById(city);
    if (!cityInfo)
        return [];
    return await fetchRestaurants({
        academy: cityInfo.academy,
        area: cityInfo.area
    });
}
export async function fetchMenuList(city, restaurant) {
    let cityInfo = findCityById(city);
    if (!cityInfo)
        return [];
    return await fetchMenu({
        academy: cityInfo.academy,
        restaurant: restaurant
    });
}
export async function fetchRestaurantStats(restaurant) {
}

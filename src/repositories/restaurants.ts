import type { Menu, Restaurant, RestaurantAPI } from "../crous/models.js";
import type { CityId } from "@strascrous/data";
import { valkey, VALKEY_APP_ID } from "../infrastructure/redis.js";

const RESTAURANTS_TTL_SECONDS = 7 * 24 * 60 * 60;
const RESTAURANTS_TTL_SECONDS_IF_EMPTY = 5 * 60;
const _key = (city: CityId) => `${VALKEY_APP_ID}:restaurants:${city}`;

export async function getRestaurantsInCache(city: CityId): Promise<Array<RestaurantAPI> | null> {
    let key = _key(city);
    try {
        let raw = await valkey.get(key);
        if (raw === null) return null;

        let data: Array<RestaurantAPI> = JSON.parse(raw) as Array<RestaurantAPI>;
        return data;
    } catch (e) {
        console.error(`Erreur lors de la connexion à Valkey: `, e);
        return null;
    }
}

export async function saveRestaurantsInCache(city: CityId, data: Array<RestaurantAPI>) {
    let key = _key(city);

    let ex = RESTAURANTS_TTL_SECONDS;
    if (data.length === 0) ex = RESTAURANTS_TTL_SECONDS_IF_EMPTY;

    try {
        let str = JSON.stringify(data);
        await valkey.set(key, str, "EX", ex);
    } catch (e) {
        console.error(`Erreur lors de la connexion à Valkey: `, e);
    }
}

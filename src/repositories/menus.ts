import type { Menu } from "../crous/models.js";
import type { CityId } from "../domain/cities.js";
import { valkey, VALKEY_APP_ID } from "../infrastructure/redis.js";

const MENU_TTL_SECONDS = 60 * 60;
const MENU_TTL_SECONDS_IF_EMPTY = 5 * 60;
const _key = (city: CityId, restaurant: number) => `${VALKEY_APP_ID}:menus:${city}:${restaurant}`;

export async function getMenuInCache(city: CityId, restaurant: number): Promise<Array<Menu> | null> {
    let key = _key(city, restaurant);
    try {
        let raw = await valkey.get(key);
        if (raw === null) return null;

        let data: Array<Menu> = JSON.parse(raw) as Array<Menu>;
        return data;
    } catch (e) {
        console.error(`Erreur lors de la connexion à Valkey: `, e);
        return null;
    }
}

export async function saveMenuInCache(city: CityId, restaurant: number, data: Array<Menu>) {
    let key = _key(city, restaurant);

    let ex = MENU_TTL_SECONDS;
    if (data.length === 0) ex = MENU_TTL_SECONDS_IF_EMPTY;

    try {
        let str = JSON.stringify(data);
        await valkey.set(key, str, "EX", ex);
    } catch (e) {
        console.error(`Erreur lors de la connexion à Valkey: `, e);
    }
}

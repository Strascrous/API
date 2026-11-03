import type { Menu } from "../crous/models.js";
import type { CityId } from "@strascrous/data";
import { valkey, VALKEY_APP_ID } from "../infrastructure/redis.js";

const MENU_TTL_SECONDS = 60 * 60;
const MENU_TTL_SECONDS_IF_EMPTY = 5 * 60;
const _key = (id: string) => `${VALKEY_APP_ID}:menus:${id}`;

export async function getMenuInCache(id: string): Promise<Array<Menu> | null> {
    let key = _key(id);
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

export async function saveMenuInCache(id: string, data: Array<Menu>) {
    let key = _key(id);

    let ex = MENU_TTL_SECONDS;
    if (data.length === 0) ex = MENU_TTL_SECONDS_IF_EMPTY;

    try {
        let str = JSON.stringify(data);
        await valkey.set(key, str, "EX", ex);
    } catch (e) {
        console.error(`Erreur lors de la connexion à Valkey: `, e);
    }
}

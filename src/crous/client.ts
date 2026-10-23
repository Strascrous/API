import type { RawData } from "./models.js";

export async function fetchCROUS(academy: string): Promise<RawData> {
    let req = await fetch(`http://webservices-v2.crous-mobile.fr/feed/${academy}/externe/crous-${academy}.json`)

    let raw = await req.text();
    let clean = raw.replace(/[\u0000-\u001F]+/g, " ");

    return JSON.parse(clean);
}

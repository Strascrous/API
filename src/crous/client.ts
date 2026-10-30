import type { RawMobileData, RawStatsData } from "./models.js";

export async function fetchCROUSMobile(academy: string): Promise<RawMobileData> {
    let req = await fetch(`http://webservices-v2.crous-mobile.fr/feed/${academy}/externe/crous-${academy}.json`)

    let raw = await req.text();
    let clean = raw.replace(/[\u0000-\u001F]+/g, " ");

    return JSON.parse(clean);
}

export async function fetchCROUSStats(id: string): Promise<RawStatsData> {
    return {
        majLe: "2026-10-15T08:30:53+02:00",
        donneesAJour: true,
        lieux: [
            {
                libelle: "UG RU ILLKIRCH - 186 706 446 00124",
                repas: 0,
                jauge: 1800,
                restant: 1800,
                pourcentageRestant: 100,
                couleur: "vert",
                depassement: false
            }
        ]
    };
}

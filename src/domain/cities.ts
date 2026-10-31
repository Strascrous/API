export const cities: Array<City> = [
    // Académie de Strasbourg
    {
        id: "strasbourg",
        name: "Strasbourg",
        academy: "strasbourg",
        areas: ["Strasbourg"]
    },
    {
        id: "mulhouse",
        name: "Mulhouse",
        academy: "strasbourg",
        areas: ["Mulhouse"]
    },
    {
        id: "colmar",
        name: "Colmar",
        academy: "strasbourg",
        areas: ["Colmar"]
    },

    // Académie Nancy-Metz
    {
        id: "nancy",
        name: "Nancy",
        academy: "nancy.metz",
        areas: ["Nancy", "Vandœuvre-lès-Nancy", "Villers-lès-Nancy"]
    },
    {
        id: "metz",
        name: "Metz",
        academy: "nancy.metz",
        areas: ["Metz"]
    },
    {
        id: "epinal",
        name: "Épinal",
        academy: "nancy.metz",
        areas: ["Épinal"]
    },
    {
        id: "longwy",
        name: "Longwy",
        academy: "nancy.metz",
        areas: ["Longwy"]
    },
    {
        id: "yutz",
        name: "Yutz",
        academy: "nancy.metz",
        areas: ["Yutz"]
    },

    // Académie Bourgogne-Franche-Comté
    {
        id: "belfort",
        name: "Belfort",
        academy: "bfc",
        areas: ["Belfort", "Sévenans"]
    },
    {
        id: "besancon",
        name: "Besançon",
        academy: "bfc",
        areas: ["Besançon"]
    },
    {
        id: "dijon",
        name: "Dijon",
        academy: "bfc",
        areas: ["Dijon"]
    },
    {
        id: "le.creusot",
        name: "Le Creusot",
        academy: "bfc",
        areas: ["Le Creusot"]
    },
    {
        id: "montbeliard",
        name: "Montbéliard",
        academy: "bfc",
        areas: ["Montbéliard"],
    },

    // Académie de Rennes
    {
        id: "rennes",
        name: "Rennes",
        academy: "rennes",
        areas: ["Rennes Centre", "Rennes est-Beaulieu", "Rennes ouest-Villejean", "Bruz"]
    },
    {
        id: "brest",
        name: "Brest",
        academy: "rennes",
        areas: ["Brest"]
    },
    /* {
        id: "bruz",
        name: "Bruz",
        academy: "rennes",
        areas: []
    },*/
    {
        id: "lannion",
        name: "Lannion",
        academy: "rennes",
        areas: ["Lannion"]
    },
    {
        id: "lorient",
        name: "Lorient",
        academy: "rennes",
        areas: ["Lorient"]
    },
    {
        id: "quimper",
        name: "Quimper",
        academy: "rennes",
        areas: ["Quimper"]
    },
    {
        id: "saint.brieuc",
        name: "Saint Brieuc",
        academy: "rennes",
        areas: ["Saint Brieuc"],
    },
    {
        id: "saint.malo",
        name: "Saint Malo",
        academy: "rennes",
        areas: ["Saint Malo"]
    },
    {
        id: "vannes",
        name: "Vannes",
        academy: "rennes",
        areas: ["Vannes"]
    }
] as const;

export const validAcademies = new Set(cities.map((c) => c.academy));
export const citiesIds = cities.map(c => c.id);

export interface City {
    id: string;
    name: string;
    academy: string;
    areas: Array<string>;
}

export type CityId = (typeof cities)[number]['id'];

export function findCityById(id: string) {
    return cities.find((city) => city.id === id)
}

export const cities: Array<City> = [
    {
        id: "strasbourg",
        name: "Strasbourg",
        academy: "strasbourg",
        area: "Strasbourg"
    },
    {
        id: "mulhouse",
        name: "Mulhouse",
        academy: "strasbourg",
        area: "Mulhouse"
    },
    {
        id: "colmar",
        name: "Colmar",
        academy: "strasbourg",
        area: "Colmar"
    },
    {
        id: "nancy",
        name: "Nancy",
        academy: "nancy.metz",
        area: "Nancy"
    },
    {
        id: "vandoeuvre.nancy",
        name: "Vandœuvre-lès-Nancy",
        academy: "nancy.metz",
        area: "Vandœuvre-lès-Nancy"
    },
    {
        id: "villers.nancy",
        name: "Villers-lès-Nancy",
        academy: "nancy.metz",
        area: "Villers-lès-Nancy"
    },
    {
        id: "metz",
        name: "Metz",
        academy: "nancy.metz",
        area: "Metz"
    },
    {
        id: "epinal",
        name: "Épinal",
        academy: "nancy.metz",
        area: "Épinal"
    },
    {
        id: "longwy",
        name: "Longwy",
        academy: "nancy.metz",
        area: "Longwy"
    },
    {
        id: "yutz",
        name: "Yutz",
        academy: "nancy.metz",
        area: "Yutz"
    }
] as const;

export const validAcademies = new Set(cities.map((c) => c.academy));
export const citiesIds = cities.map(c => c.id);

export interface City {
    id: string;
    name: string;
    academy: string;
    area: string;
}

export type CityId = (typeof cities)[number]['id'];

export function findCityById(id: string) {
    return cities.find((city) => city.id === id)
}

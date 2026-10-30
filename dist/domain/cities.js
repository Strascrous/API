export const cities = [
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
];
export const citiesIds = cities.map(c => c.id);
export function findCityById(id) {
    return cities.find((city) => city.id === id);
}

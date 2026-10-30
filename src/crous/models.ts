export type RestaurantType = "restaurant" | "cafeteria" | "unknown";

/**********************
 * Données brutes
 **********************/

export interface RawRestaurantContact {
    tel: string;
    email: string;
}

export interface RawRestaurantPhoto {
    src: string;
    alt: string;
}

export interface RawRestaurantPayment {
    name: string;
}

export interface RawRestaurantMenu {
    date: string;
    meal: Array<RawRestaurantMeal>;
}

export interface RawRestaurantMeal {
    name: string;
    foodcategory: Array<RawRestaurantFoodcategory>
}

export interface RawRestaurantFoodcategory {
    name: string;
    dishes: Array<RawRestaurantDish>
}

export interface RawRestaurantDish {
    name: string;
}

export interface RawRestaurant {
    id: number;
    title: string;
    lat: number;
    lon: number;
    area: string;
    adresse: string;
    opening: string;
    closing: string;
    type: string;
    accessibility: boolean;
    wifi: boolean;
    shortdesc: string;
    description: string;
    access: string;
    operationalhours: string;
    contact: RawRestaurantContact;
    crousandgo: string;
    photo: RawRestaurantPhoto;
    payment: Array<RawRestaurantPayment>;
    menus: Array<RawRestaurantMenu>;
}

export interface RawMobileData {
     restaurants: Array<RawRestaurant>;
}

export interface RawPlace {
    libelle: string;
    repas: number;
    jauge: number;
    restant: number;
    pourcentageRestant: number;
    couleur: string;
    depassement: boolean;
}

export interface RawStatsData {
    majLe: string;
    donneesAJour: boolean;
    lieux: Array<RawPlace>;
}

 /**********************
  * Données traitées
  **********************/

export interface Restaurant {
    id: number;
    title: string;
    type: RestaurantType;
}

export type RestaurantAPI = Omit<Restaurant, "id"> & { id: string };

export interface Menu {
    date: string;
    noon: Array<MenuItem>;
    evening: Array<MenuItem>;
}

export interface MenuItem {
    title: string;
    elements: Array<string>;
}

export interface Stats {
    updatedAt: string;
    meals: number;
    max: number;
    percent: number;
}

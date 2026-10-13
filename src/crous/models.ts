export type RestaurantType = "restaurant" | "cafeteria" | "unknown";

export interface Restaurant {
    id: number;
    title: string;
    type: RestaurantType;
}

export interface Menu {
    date: string;
    noon: Array<MenuItem>;
    evening: Array<MenuItem>;
}

export interface MenuItem {
    title: string;
    elements: Array<string>;
}

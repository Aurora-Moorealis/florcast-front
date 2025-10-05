export interface Location {
    country_code: string;
    location_name: string;
    coords: {
        latitude: number;
        longitude: number;
    };
}

export interface Flower {
    id: number;
    scientific_name: string;
    common_name: string;
    description: string;
    max_height: number;
    initial_height: number;
    temperature_to_grow: number;
    growth_rate: number;
    bloom_season: string;
    created_at: string;
    updated_at: string;
    planting_date: string;
    location: Location;
}

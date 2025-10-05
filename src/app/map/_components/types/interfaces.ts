// Interfaces adicionales para el manejo de datos de flores y API

export interface FlowerFilter {
    category?: string;
    rarity?: string;
    season?: string;
    family?: string;
    location?: string;
    minHeight?: number;
    maxHeight?: number;
    minGrowthRate?: number;
    maxGrowthRate?: number;
}

export interface FlowerSearchParams {
    query?: string;
    filters?: FlowerFilter;
    sortBy?: 'name' | 'height' | 'growth_rate' | 'bloom_season';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
}

export interface FlowerResponse {
    flowers: import('./flowers').Flower[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export interface FlowerLocation {
    id: number;
    latitude: number;
    longitude: number;
    location_name: string;
    flower_count: number;
}

export interface FlowerStatistics {
    total_flowers: number;
    families_count: number;
    average_height: number;
    average_growth_rate: number;
    most_common_season: string;
    rarity_distribution: {
        común: number;
        rara: number;
        exótica: number;
        legendaria: number;
    };
}

export interface FlowerPrediction {
    flower_id: number;
    predicted_bloom_date: string;
    confidence: number;
    weather_factors: {
        temperature: number;
        humidity: number;
        rainfall: number;
        sunlight_hours: number;
    };
}

// Tipos para el mapa interactivo
export interface FlowerMarker {
    id: number;
    flower: import('./flowers').Flower;
    position: {
        lat: number;
        lng: number;
    };
    isVisible: boolean;
    cluster?: string;
}

export interface MapBounds {
    north: number;
    south: number;
    east: number;
    west: number;
}

// Tipos para configuración de la aplicación
export interface AppConfig {
    api: {
        baseUrl: string;
        endpoints: {
            flowers: string;
            locations: string;
            predictions: string;
            statistics: string;
        };
    };
    map: {
        defaultZoom: number;
        defaultCenter: {
            lat: number;
            lng: number;
        };
        maxZoom: number;
        minZoom: number;
    };
    ui: {
        itemsPerPage: number;
        animationDuration: number;
        debounceDelay: number;
    };
}
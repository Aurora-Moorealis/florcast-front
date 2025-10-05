export interface Flower {
    id:              number;
    scientific_name: string;
    common_name:     string;
    family:          string;
    description:     string;
    height:          number;
    growth_rate:     number;
    bloom_season:    string[] | string; // La API puede enviar string o array
    latitude:        number;
    longitude:       number;
    location_name:   string;
}

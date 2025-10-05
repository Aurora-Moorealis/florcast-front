import { Flower } from '../app/map/_components/types/flowers';

// Datos de prueba para flores que coinciden con el formato de la API
export const mockFlowerData: Flower[] = [
    // Datos que coinciden exactamente con el formato de la API
    {
        id: 1,
        scientific_name: "Rosa gallica",
        common_name: "French Rose",
        family: "Rosaceae",
        description: "A species of rose native to southern and central Europe, known for its deep pink flowers.",
        height: 120.0,
        growth_rate: 0,
        bloom_season: ["Spring", "Summer"],
        latitude: 48.8566,
        longitude: 2.3522,
        location_name: "Jardin des Plantes, Paris"
    },
    {
        id: 2,
        scientific_name: "Helianthus annuus",
        common_name: "Sunflower",
        family: "Asteraceae",
        description: "Tall annual plant with large yellow flowers that follow the sun's movement.",
        height: 300.0,
        growth_rate: 0,
        bloom_season: ["Summer"],
        latitude: 37.7749,
        longitude: -122.4194,
        location_name: "Golden Gate Park, San Francisco"
    },
    {
        id: 3,
        scientific_name: "Hibiscus rosa-sinensis",
        common_name: "China Rose",
        family: "Malvaceae",
        description: "Tropical plant with large, showy red flowers often used in ornamental gardens.",
        height: 200.0,
        growth_rate: 0,
        bloom_season: ["Spring", "Winter"],
        latitude: 18.4861,
        longitude: -69.9312,
        location_name: "Botanical Garden, Santo Domingo"
    },
    {
        id: 4,
        scientific_name: "Tulipa gesneriana",
        common_name: "Garden Tulip",
        family: "Liliaceae",
        description: "A perennial bulbous plant with brightly colored cup-shaped flowers.",
        height: 45.0,
        growth_rate: 0,
        bloom_season: ["Spring"],
        latitude: 52.3702,
        longitude: 4.8952,
        location_name: "Keukenhof Gardens, Netherlands"
    },
    {
        id: 5,
        scientific_name: "Lavandula angustifolia",
        common_name: "English Lavender",
        family: "Lamiaceae",
        description: "Small aromatic shrub used for essential oils and decoration.",
        height: 60.0,
        growth_rate: 0,
        bloom_season: ["Spring", "Summer"],
        latitude: 43.7034,
        longitude: 7.2663,
        location_name: "Provence, France"
    },
    // Flores adicionales para más variedad en las pruebas
    {
        id: 6,
        scientific_name: "Rosa rubiginosa",
        common_name: "Sweet Briar Rose",
        family: "Rosaceae",
        description: "Wild rose with pink flowers and vitamin C rich hips.",
        height: 250.0,
        growth_rate: 0,
        bloom_season: ["Spring"],
        latitude: -34.6037,
        longitude: -58.3816,
        location_name: "Buenos Aires Botanical Garden, Argentina"
    },
    {
        id: 7,
        scientific_name: "Bellis perennis",
        common_name: "Common Daisy",
        family: "Asteraceae",
        description: "Small white daisy with yellow center, very common in European meadows.",
        height: 20.0,
        growth_rate: 0,
        bloom_season: ["Spring", "Summer", "Autumn"],
        latitude: 52.5200,
        longitude: 13.4050,
        location_name: "Tiergarten, Berlin"
    },
    {
        id: 8,
        scientific_name: "Hibiscus syriacus",
        common_name: "Rose of Sharon",
        family: "Malvaceae",
        description: "Blue-violet hibiscus, national flower of South Korea. Very cold resistant.",
        height: 250.0,
        growth_rate: 0,
        bloom_season: ["Summer", "Autumn"],
        latitude: 37.5665,
        longitude: 126.9780,
        location_name: "Seoul Botanical Garden, South Korea"
    },
    {
        id: 9,
        scientific_name: "Brugmansia suaveolens",
        common_name: "Angel's Trumpet",
        family: "Solanaceae",
        description: "Hanging trumpet-shaped white flower with intense nocturnal fragrance. Highly toxic.",
        height: 400.0,
        growth_rate: 0,
        bloom_season: ["Summer", "Autumn"],
        latitude: -12.0464,
        longitude: -77.0428,
        location_name: "Lima Botanical Garden, Peru"
    },
    {
        id: 10,
        scientific_name: "Petunia × atkinsiana",
        common_name: "Garden Petunia",
        family: "Solanaceae",
        description: "Hybrid petunia with intense fuchsia color and unique patterns. Popular in ornamental gardening.",
        height: 40.0,
        growth_rate: 0,
        bloom_season: ["Spring", "Summer"],
        latitude: 25.7617,
        longitude: -80.1918,
        location_name: "Fairchild Tropical Garden, Miami"
    },
    {
        id: 11,
        scientific_name: "Narcissus poeticus",
        common_name: "Poet's Narcissus",
        family: "Amaryllidaceae",
        description: "Classic narcissus with white petals and yellow crown bordered in red. Symbol of spring.",
        height: 50.0,
        growth_rate: 0,
        bloom_season: ["Spring"],
        latitude: 37.9838,
        longitude: 23.7275,
        location_name: "National Garden, Athens"
    },
    {
        id: 12,
        scientific_name: "Amaryllis belladonna",
        common_name: "Belladonna Lily",
        family: "Amaryllidaceae",
        description: "South African bulb with pink trumpet-shaped flowers. Blooms before leaves appear.",
        height: 80.0,
        growth_rate: 0,
        bloom_season: ["Autumn"],
        latitude: -33.9249,
        longitude: 18.4241,
        location_name: "Kirstenbosch Botanical Garden, Cape Town"
    },
    {
        id: 13,
        scientific_name: "Camellia sinensis",
        common_name: "Tea Camellia",
        family: "Theaceae",
        description: "Rare camellia variety with white flowers. Used for premium tea production.",
        height: 300.0,
        growth_rate: 0,
        bloom_season: ["Winter"],
        latitude: 51.4816,
        longitude: -0.2297,
        location_name: "Kew Gardens, London"
    },
    {
        id: 14,
        scientific_name: "Dendrobium nobile",
        common_name: "Noble Dendrobium",
        family: "Orchidaceae",
        description: "High mountain orchid with white and purple flowers. Grows in extreme conditions.",
        height: 90.0,
        growth_rate: 0,
        bloom_season: ["Winter", "Spring"],
        latitude: 27.9881,
        longitude: 86.9250,
        location_name: "Everest Base Camp, Nepal"
    },
    {
        id: 15,
        scientific_name: "Taraxacum officinale",
        common_name: "Common Dandelion",
        family: "Asteraceae",
        description: "Very common yellow wild flower. Considered a weed but has medicinal properties.",
        height: 30.0,
        growth_rate: 0,
        bloom_season: ["Spring", "Summer", "Autumn"],
        latitude: 40.7128,
        longitude: -74.0060,
        location_name: "Central Park, New York"
    },
    {
        id: 16,
        scientific_name: "Trifolium repens",
        common_name: "White Clover",
        family: "Fabaceae",
        description: "Small white clover flower. Symbol of good luck when it has four leaves.",
        height: 15.0,
        growth_rate: 0,
        bloom_season: ["Spring", "Summer"],
        latitude: 53.3498,
        longitude: -6.2603,
        location_name: "Phoenix Park, Dublin"
    },
    {
        id: 17,
        scientific_name: "Strelitzia reginae",
        common_name: "Bird of Paradise",
        family: "Strelitziaceae",
        description: "Exotic flower shaped like a tropical bird in orange and blue colors. Native to South Africa.",
        height: 150.0,
        growth_rate: 0,
        bloom_season: ["Spring", "Summer"],
        latitude: -25.7479,
        longitude: 28.2293,
        location_name: "Walter Sisulu Botanical Garden, Pretoria"
    },
    {
        id: 18,
        scientific_name: "Anthurium andraeanum",
        common_name: "Flamingo Flower",
        family: "Araceae",
        description: "Tropical heart-shaped flower with waxy shine. Popular in floral arrangements.",
        height: 60.0,
        growth_rate: 0,
        bloom_season: ["Spring", "Summer", "Autumn"],
        latitude: 9.7489,
        longitude: -83.7534,
        location_name: "Manuel Antonio National Park, Costa Rica"
    },
    {
        id: 19,
        scientific_name: "Leontopodium alpinum",
        common_name: "Edelweiss",
        family: "Asteraceae",
        description: "White woolly high mountain flower. Symbol of the Alps and pure love.",
        height: 25.0,
        growth_rate: 0,
        bloom_season: ["Summer"],
        latitude: 46.5197,
        longitude: 7.4815,
        location_name: "Jungfraujoch, Switzerland"
    },
    {
        id: 20,
        scientific_name: "Orchis mascula",
        common_name: "Early Purple Orchid",
        family: "Orchidaceae",
        description: "European orchid with purple flowers and unique patterns. Extremely rare in the wild.",
        height: 60.0,
        growth_rate: 0,
        bloom_season: ["Spring"],
        latitude: 45.4642,
        longitude: 9.1900,
        location_name: "Parco Sempione, Milan"
    },
    {
        id: 21,
        scientific_name: "Ian ",
        common_name: "Epichardo",
        family: "Orchidaceae",
        description: "European orchid with purple flowers and unique patterns. Extremely rare in the wild.",
        height: 60.0,
        growth_rate: 0,
        bloom_season: ["Spring"],
        latitude: 45.4642,
        longitude: 9.1900,
        location_name: "Parco Sempione, Milan"
    }
];

// Función para obtener datos de flores (simula una llamada a API)
export const getFlowerData = async (): Promise<Flower[]> => {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockFlowerData;
};

// Función para buscar flores por filtros (simula endpoint de búsqueda)
export const searchFlowers = async (filters: {
    category?: string;
    rarity?: string;
    location?: string;
    bloom_season?: string;
}): Promise<Flower[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockFlowerData.filter(flower => {
        // Aquí podrías implementar la lógica de filtrado
        // Por ahora devuelve todos los datos
        return true;
    });
};

// Función para obtener una flor por ID
export const getFlowerById = async (id: number): Promise<Flower | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const flower = mockFlowerData.find(f => f.id === id);
    return flower || null;
};

// Estadísticas de flores (simula endpoint de estadísticas)
export const getFlowerStatistics = async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
        totalFlowers: mockFlowerData.length,
        familyCount: new Set(mockFlowerData.map(f => f.family)).size,
        locationCount: new Set(mockFlowerData.map(f => f.location_name)).size,
        avgHeight: Number((mockFlowerData.reduce((sum, f) => sum + f.height, 0) / mockFlowerData.length).toFixed(2)),
        avgGrowthRate: Number((mockFlowerData.reduce((sum, f) => sum + f.growth_rate, 0) / mockFlowerData.length).toFixed(2))
    };
};

export default mockFlowerData;

/**
 * Utilidades para CesiumJS
 * Funciones helper y configuraciones comunes
 */

import type { CesiumViewerConstructorOptions, City } from '../types/cesium.types';

/**
 * Co                outlineColor: (Cesium as any).Color.WHITE,
                outlineWidth: 2,
                heightReference: (Cesium as any).HeightReference.CLAMP_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                scaleByDistance: new (Cesium as any).NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5)               scaleByDistance: new (Cesium as any).NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)ración CDN de Cesium
 */
export const CESIUM_CDN_URL = "https://cesium.com/downloads/cesiumjs/releases/1.134/Build/Cesium/";

/**
 * Configurar la URL base de Cesium
 */
export const configureCesiumBase = (): void => {
    window.CESIUM_BASE_URL = CESIUM_CDN_URL;
};

/**
 * Configuración del viewer Earth Pro
 */
export const getAdvancedViewerConfig = (): CesiumViewerConstructorOptions => ({
    animation: false,
    baseLayerPicker: true,
    fullscreenButton: true,
    geocoder: false,
    homeButton: true,
    infoBox: true,
    sceneModePicker: false,
    selectionIndicator: true,
    timeline: false,
    navigationHelpButton: true,
    navigationInstructionsInitiallyVisible: false,
    scene3DOnly: true
});

/**
 * Datos de ciudades predefinidas
 */
export const getCitiesData = (Cesium: unknown): City[] => [
    {
        name: "Nueva York",
        longitude: -74.006,
        latitude: 40.7128,
        description: "Nueva York, Estados Unidos<br/>Centro financiero mundial",
        color: (Cesium as any).Color.CYAN
    },
    {
        name: "Londres",
        longitude: -0.1278,
        latitude: 51.5074,
        description: "Londres, Reino Unido<br/>Capital histórica",
        color: (Cesium as any).Color.RED
    },
    {
        name: "Tokio",
        longitude: 139.6503,
        latitude: 35.6762,
        description: "Tokio, Japón<br/>Metrópolis tecnológica",
        color: (Cesium as any).Color.ORANGE
    },
    {
        name: "Sídney",
        longitude: 151.2093,
        latitude: -33.8688,
        description: "Sídney, Australia<br/>Puerto del Pacífico Sur",
        color: (Cesium as any).Color.GREEN
    },
    {
        name: "París",
        longitude: 2.3522,
        latitude: 48.8566,
        description: "París, Francia<br/>Ciudad de la luz",
        color: (Cesium as any).Color.PINK
    },
    {
        name: "Dubai",
        longitude: 55.2708,
        latitude: 25.2048,
        description: "Dubai, EAU<br/>Oasis moderno",
        color: (Cesium as any).Color.GOLD
    }
];

/**
 * Configurar controles de cámara avanzados
 */
export const configureAdvancedControls = (viewer: unknown): void => {
    const controller = (viewer as any).scene.screenSpaceCameraController;
    controller.minimumZoomDistance = 1000;
    controller.maximumZoomDistance = 50000000;
    controller.enableRotate = true;
    controller.enableTranslate = true;
    controller.enableZoom = true;
    controller.enableTilt = true;
    controller.enableLook = true;
    controller.inertiaSpin = 0.9;
    controller.inertiaTranslate = 0.9;
    controller.inertiaZoom = 0.8;
};

/**
 * Configurar vista inicial de cámara
 */
export const setInitialCameraView = (camera: unknown, Cesium: unknown, coordinates?: { lon: number, lat: number, height: number }): void => {
    const { lon = 0.0, lat = 20.0, height = 12000000 } = coordinates || {};
    
    (camera as any).setView({
        destination: (Cesium as any).Cartesian3.fromDegrees(lon, lat, height),
        orientation: {
            heading: (Cesium as any).Math.toRadians(0.0),
            pitch: (Cesium as any).Math.toRadians(-45.0),
            roll: 0.0
        }
    });
};

/**
 * Configurar escena visual
 */
export const configureSceneVisuals = (scene: unknown): void => {
    (scene as any).skyAtmosphere.show = true;
    (scene as any).globe.showGroundAtmosphere = true;
    (scene as any).globe.enableLighting = false;
    (scene as any).globe.dynamicAtmosphereLighting = false;
    (scene as any).globe.atmosphereLightIntensity = 10.0;
    (scene as any).fog.enabled = false;
};

/**
 * Configurar optimizaciones de rendimiento
 */
export const configurePerformanceOptimizations = (viewer: unknown): void => {
    (viewer as any).scene.globe.tileCacheSize = 1000;
    (viewer as any).scene.requestRenderMode = true;
    (viewer as any).scene.maximumRenderTimeChange = Infinity;
};

/**
 * Manejo de errores estándar para componentes Cesium
 */
export const handleCesiumError = (error: unknown, setError: (error: string) => void, setIsLoading: (loading: boolean) => void): void => {
    console.error("❌ Error inicializando Cesium:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    setError(errorMessage);
    setIsLoading(false);
};

/**
 * Configurar terreno avanzado con fallback
 */
export const setupAdvancedTerrain = async (viewer: unknown, Cesium: unknown): Promise<boolean> => {
    try {
        if (typeof (Cesium as any).createWorldTerrainAsync === 'function') {
            const worldTerrain = await (Cesium as any).createWorldTerrainAsync({
                requestWaterMask: true,
                requestVertexNormals: true
            });
            (viewer as any).terrainProvider = await (Cesium as any).createWorldTerrainAsync();
            return true;
        }
        return false;
    } catch (terrainError: any) {
        console.warn('Error cargando Cesium Ion Terrain:', terrainError.message);
        (viewer as any).terrainProvider = new (Cesium as any).EllipsoidTerrainProvider();
        return false;
    }
};

/**
 * Añadir marcadores de ciudades
 */
export const addCityMarkers = (viewer: unknown, Cesium: unknown): void => {
    const cities = getCitiesData(Cesium);
    
    cities.forEach((city: City) => {
        (viewer as any).entities.add({
            position: (Cesium as any).Cartesian3.fromDegrees(city.longitude, city.latitude, 0),
            name: city.name,
            description: city.description,
            point: {
                pixelSize: 20,
                color: city.color,
                outlineColor: (Cesium as any).Color.WHITE,
                outlineWidth: 3,
                heightReference: (Cesium as any).HeightReference.CLAMP_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                scaleByDistance: new (Cesium as any).NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5)
            },
            label: {
                text: city.name,
                font: '14pt sans-serif',
                fillColor: (Cesium as any).Color.WHITE,
                outlineColor: (Cesium as any).Color.BLACK,
                outlineWidth: 2,
                style: (Cesium as any).LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new (Cesium as any).Cartesian2(0, -40),
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                scaleByDistance: new (Cesium as any).NearFarScalar(1.5e2, 1.0, 1.5e7, 0.0)
            }
        });
    });
};

/**
 * Configurar eventos de interacción
 */
export const setupInteractionEvents = (viewer: unknown, Cesium: unknown): void => {
    (viewer as any).selectedEntityChanged.addEventListener(() => {
        const selectedEntity = (viewer as any).selectedEntity;
        if (selectedEntity && selectedEntity.name) {
            console.log(`Ciudad seleccionada: ${selectedEntity.name}`);
            (viewer as any).flyTo(selectedEntity, {
                duration: 2.0,
                offset: new (Cesium as any).HeadingPitchRange(0, (Cesium as any).Math.toRadians(-45), 5000000)
            });
        }
    });
};
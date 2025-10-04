/**
 * Utilidades para CesiumJS
 * Funciones helper y configuraciones comunes
 */

import type { CesiumViewerConstructorOptions, City, CesiumColor } from '../types/cesium.types';

/**
 * Configuración CDN de Cesium
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
export const getCitiesData = (Cesium: any): City[] => [
    {
        name: "Nueva York",
        longitude: -74.006,
        latitude: 40.7128,
        description: "Nueva York, Estados Unidos<br/>Centro financiero mundial",
        color: Cesium.Color.CYAN
    },
    {
        name: "Londres",
        longitude: -0.1278,
        latitude: 51.5074,
        description: "Londres, Reino Unido<br/>Capital histórica",
        color: Cesium.Color.RED
    },
    {
        name: "Tokio",
        longitude: 139.6503,
        latitude: 35.6762,
        description: "Tokio, Japón<br/>Metrópolis tecnológica",
        color: Cesium.Color.ORANGE
    },
    {
        name: "Sídney",
        longitude: 151.2093,
        latitude: -33.8688,
        description: "Sídney, Australia<br/>Puerto del Pacífico Sur",
        color: Cesium.Color.GREEN
    },
    {
        name: "París",
        longitude: 2.3522,
        latitude: 48.8566,
        description: "París, Francia<br/>Ciudad de la luz",
        color: Cesium.Color.PINK
    },
    {
        name: "Dubai",
        longitude: 55.2708,
        latitude: 25.2048,
        description: "Dubai, EAU<br/>Oasis moderno",
        color: Cesium.Color.GOLD
    }
];

/**
 * Configurar controles de cámara avanzados
 */
export const configureAdvancedControls = (viewer: any): void => {
    const controller = viewer.scene.screenSpaceCameraController;
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
export const setInitialCameraView = (camera: any, Cesium: any, coordinates?: { lon: number, lat: number, height: number }): void => {
    const { lon = 0.0, lat = 20.0, height = 12000000 } = coordinates || {};
    
    camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
        orientation: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-45.0),
            roll: 0.0
        }
    });
};

/**
 * Configurar escena visual
 */
export const configureSceneVisuals = (scene: any): void => {
    scene.skyAtmosphere.show = true;
    scene.globe.showGroundAtmosphere = true;
    scene.globe.enableLighting = false;
    scene.globe.dynamicAtmosphereLighting = false;
    scene.globe.atmosphereLightIntensity = 10.0;
    scene.fog.enabled = false;
};

/**
 * Configurar optimizaciones de rendimiento
 */
export const configurePerformanceOptimizations = (viewer: any): void => {
    viewer.scene.globe.tileCacheSize = 1000;
    viewer.scene.requestRenderMode = true;
    viewer.scene.maximumRenderTimeChange = Infinity;
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
export const setupAdvancedTerrain = async (viewer: any, Cesium: any): Promise<boolean> => {
    try {
        if (typeof Cesium.createWorldTerrainAsync === 'function') {
            const worldTerrain = await Cesium.createWorldTerrainAsync({
                requestWaterMask: true,
                requestVertexNormals: true
            });
            viewer.terrainProvider = worldTerrain;
            return true;
        }
        return false;
    } catch (terrainError: any) {
        console.warn('Error cargando Cesium Ion Terrain:', terrainError.message);
        viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();
        return false;
    }
};

/**
 * Añadir marcadores de ciudades
 */
export const addCityMarkers = (viewer: any, Cesium: any): void => {
    const cities = getCitiesData(Cesium);
    
    cities.forEach((city: City) => {
        viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(city.longitude, city.latitude, 0),
            name: city.name,
            description: city.description,
            point: {
                pixelSize: 20,
                color: city.color,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 3,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 3.0, 1.5e7, 0.5)
            },
            label: {
                text: city.name,
                font: '14pt sans-serif',
                fillColor: Cesium.Color.WHITE,
                outlineColor: Cesium.Color.BLACK,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new Cesium.Cartesian2(0, -40),
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.0)
            }
        });
    });
};

/**
 * Configurar eventos de interacción
 */
export const setupInteractionEvents = (viewer: any, Cesium: any): void => {
    viewer.selectedEntityChanged.addEventListener(() => {
        const selectedEntity: any = viewer.selectedEntity;
        if (selectedEntity && selectedEntity.name) {
            console.log(`Ciudad seleccionada: ${selectedEntity.name}`);
            viewer.flyTo(selectedEntity, {
                duration: 2.0,
                offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 5000000)
            });
        }
    });
};
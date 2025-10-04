/**
 * Interfaces y tipos TypeScript para CesiumJS
 * Definiciones centralizadas para todos los componentes de globo
 */

// Interfaces básicas de CesiumJS
export interface CesiumColor {
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

export interface CesiumCartesian3 {
    x: number;
    y: number;
    z: number;
}

export interface CesiumCartesian2 {
    x: number;
    y: number;
}

// Interfaces del Viewer y Scene
export interface CesiumViewer {
    scene: CesiumScene;
    camera: CesiumCamera;
    terrainProvider: CesiumTerrainProvider;
    entities: CesiumEntityCollection;
    selectedEntityChanged: CesiumEvent;
    isDestroyed(): boolean;
    destroy(): void;
    flyTo(target: CesiumEntity | CesiumEntityCollection, options?: CesiumFlyToOptions): Promise<boolean>;
}

export interface CesiumScene {
    globe: CesiumGlobe;
    skyAtmosphere: CesiumSkyAtmosphere;
    screenSpaceCameraController: CesiumScreenSpaceCameraController;
    fog: CesiumFog;
    requestRenderMode?: boolean;
    maximumRenderTimeChange?: number;
}

export interface CesiumCamera {
    setView(options: CesiumCameraSetViewOptions): void;
}

export interface CesiumCameraSetViewOptions {
    destination: CesiumCartesian3;
    orientation?: CesiumCameraOrientation;
}

export interface CesiumCameraOrientation {
    heading: number;
    pitch: number;
    roll: number;
}

// Interfaces de controles
export interface CesiumScreenSpaceCameraController {
    minimumZoomDistance: number;
    maximumZoomDistance: number;
    enableRotate: boolean;
    enableTranslate: boolean;
    enableZoom: boolean;
    enableTilt: boolean;
    enableLook: boolean;
    inertiaSpin: number;
    inertiaTranslate: number;
    inertiaZoom: number;
}

export interface CesiumGlobe {
    showGroundAtmosphere: boolean;
    enableLighting: boolean;
    dynamicAtmosphereLighting?: boolean;
    atmosphereLightIntensity?: number;
    tileCacheSize?: number;
}

export interface CesiumSkyAtmosphere {
    show: boolean;
}

export interface CesiumFog {
    enabled: boolean;
}

// Interfaces de terreno y entidades
export interface CesiumTerrainProvider {}

export interface CesiumEntity {
    name?: string;
    description?: string;
    position?: CesiumCartesian3;
    point?: CesiumPointGraphics;
    label?: CesiumLabelGraphics;
}

export interface CesiumPointGraphics {
    pixelSize: number;
    color: CesiumColor;
    outlineColor: CesiumColor;
    outlineWidth: number;
    heightReference: number;
    disableDepthTestDistance: number;
    scaleByDistance: CesiumNearFarScalar;
}

export interface CesiumLabelGraphics {
    text: string;
    font: string;
    fillColor: CesiumColor;
    outlineColor: CesiumColor;
    outlineWidth: number;
    style: number;
    pixelOffset: CesiumCartesian2;
    disableDepthTestDistance: number;
    scaleByDistance: CesiumNearFarScalar;
}

export interface CesiumNearFarScalar {
    near: number;
    nearValue: number;
    far: number;
    farValue: number;
}

export interface CesiumHeadingPitchRange {
    heading: number;
    pitch: number;
    range: number;
}

export interface CesiumEntityCollection {
    add(entity: CesiumEntity): CesiumEntity;
}

export interface CesiumEvent {
    addEventListener(listener: () => void): void;
}

export interface CesiumFlyToOptions {
    duration?: number;
    offset?: CesiumHeadingPitchRange;
}

// Interfaces para opciones de construcción
export interface CesiumViewerConstructorOptions {
    animation?: boolean;
    baseLayerPicker?: boolean;
    fullscreenButton?: boolean;
    geocoder?: boolean;
    homeButton?: boolean;
    infoBox?: boolean;
    sceneModePicker?: boolean;
    selectionIndicator?: boolean;
    timeline?: boolean;
    navigationHelpButton?: boolean;
    navigationInstructionsInitiallyVisible?: boolean;
    scene3DOnly?: boolean;
    terrainProvider?: CesiumTerrainProvider;
}

export interface CesiumWorldTerrainOptions {
    requestWaterMask?: boolean;
    requestVertexNormals?: boolean;
}

// Interfaces específicas para la aplicación
export interface City {
    name: string;
    longitude: number;
    latitude: number;
    description: string;
    color: CesiumColor;
}

export interface GlobeError extends Error {
    name: string;
    message: string;
    stack?: string;
}

export interface CesiumError {
    message: string;
    stack?: string;
}

// Types para componentes React
export type ViewMode = "basic" | "simple" | "advanced";

export interface MapProps {
    defaultView?: ViewMode;
}

export interface ViewInfo {
    icon: string;
    label: string;
    description: string;
}

// Declaraciones globales
declare global {
    interface Window {
        CESIUM_BASE_URL?: string;
        Cesium?: any;
        cesiumViewer?: any;
    }
}
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
 * Configurar escena visual - Modo diurno fijo
 */
export const configureSceneVisuals = (scene: unknown): void => {
    (scene as any).skyAtmosphere.show = true;
    (scene as any).globe.showGroundAtmosphere = true;
    
    // Configurar iluminación fija diurna
    (scene as any).globe.enableLighting = true; // Activar iluminación
    (scene as any).globe.dynamicAtmosphereLighting = false; // Desactivar cambios dinámicos
    (scene as any).globe.atmosphereLightIntensity = 15.0; // Intensidad alta para simular día
    
    // Configuración atmosférica optimizada para día
    if ((scene as any).skyAtmosphere) {
        (scene as any).skyAtmosphere.brightnessShift = 0.3; // Más brillante
        (scene as any).skyAtmosphere.saturationShift = 0.1; // Más saturado
    }
    
    (scene as any).fog.enabled = false; // Sin fog para máxima claridad
    
    console.log("☀️ Escena configurada en modo diurno permanente");
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

/**
 * Configuración de calidad ultra-alta para el globo
 */
export const configureUltraHighQuality = (viewer: unknown, Cesium: unknown): void => {
    try {
        const scene = (viewer as any).scene;
        const globe = scene.globe;
        
        // Configuración de antialiasing y calidad de renderizado
        if (scene.fxaa !== undefined) {
            scene.fxaa = true;  // FXAA antialiasing
        }
        
        if (scene.postProcessStages?.fxaa) {
            scene.postProcessStages.fxaa.enabled = true;
        }
        
        // Configuración de terreno de alta calidad
        globe.enableLighting = true; // Iluminación realista

        // Configurar atmósfera solo si las propiedades están disponibles
        if (globe.atmosphereLightIntensity !== undefined) {
            globe.atmosphereLightIntensity = 5.0;
        }
        
        if ((Cesium as any).Cartesian3 && globe.atmosphereRayleighCoefficient !== undefined) {
            globe.atmosphereRayleighCoefficient = new (Cesium as any).Cartesian3(4.0e-6, 1.13e-5, 2.7e-5);
            globe.atmosphereMieCoefficient = new (Cesium as any).Cartesian3(2.1e-5, 2.1e-5, 2.1e-5);
        }
        
        if (globe.atmosphereRayleighScaleHeight !== undefined) {
            globe.atmosphereRayleighScaleHeight = 10000;
            globe.atmosphereMieScaleHeight = 3200;
        }
        
        // Configuración de sombras dinámicas
        if (scene.shadowMap) {
            scene.shadowMap.enabled = true;
            scene.shadowMap.size = 4096;  // Alta resolución de sombras
            if (scene.shadowMap.softShadows !== undefined) {
                scene.shadowMap.softShadows = true;
            }
            if (scene.shadowMap.darkness !== undefined) {
                scene.shadowMap.darkness = 0.3;
            }
        }
        
        // Configuración de agua y océanos
        if (globe.showWaterEffect !== undefined) {
            globe.showWaterEffect = true;
        }
        
        // Configuración de iluminación avanzada
        if (scene.sun?.glowFactor !== undefined) {
            scene.sun.glowFactor = 3.0;
        }
        
        if (scene.moon?.show !== undefined) {
            scene.moon.show = true;
        }
        
        // Configuración de fog atmosférico
        if (scene.fog) {
            scene.fog.enabled = true;
            if (scene.fog.density !== undefined) {
                scene.fog.density = 0.0002;
            }
            if (scene.fog.screenSpaceErrorFactor !== undefined) {
                scene.fog.screenSpaceErrorFactor = 2.0;
            }
        }
        
        console.log("🌟 Configuración ultra-alta calidad aplicada");
    } catch (error) {
        console.warn("⚠️ Error aplicando configuración ultra-alta:", error);
    }
};

/**
 * Implementar efectos atmosféricos avanzados
 */
export const setupAdvancedAtmosphere = (viewer: unknown, Cesium: unknown): void => {
    const scene = (viewer as any).scene;
    const globe = scene.globe;
    
    // Configuración atmosférica avanzada
    globe.atmosphereHueShift = 0.0;
    globe.atmosphereSaturationShift = 0.1;
    globe.atmosphereBrightnessShift = 0.1;
    
    // Efectos de scattering mejorados
    scene.skyAtmosphere.hueShift = 0.0;
    scene.skyAtmosphere.saturationShift = 0.0;
    scene.skyAtmosphere.brightnessShift = 0.0;
    
    // Configuración de las luces del sol y la luna
    scene.light = new (Cesium as any).SunLight();
    
    console.log("🌅 Efectos atmosféricos avanzados configurados");
};

/**
 * Configurar terreno de ultra-alta definición
 */
export const setupUltraHDTerrain = async (viewer: unknown, Cesium: unknown): Promise<void> => {
    const scene = (viewer as any).scene;
    
    try {
        // Cesium World Terrain con máxima calidad
        const terrainProvider = await (Cesium as any).CesiumTerrainProvider.fromIonAssetId(1, {
            requestWaterMask: true,
            requestVertexNormals: true,
        });
        
        scene.terrainProvider = terrainProvider;
        
        // Configuración de calidad de terreno
        scene.globe.terrainExaggeration = 1.0;
        scene.globe.terrainExaggerationRelativeHeight = 0.0;
        
        // Configuración de mesh de terreno
        scene.globe.maximumScreenSpaceError = 1.0; // Máxima calidad (valor bajo)
        scene.globe.tileCacheSize = 300; // Cache más grande
        
        console.log("🏔️ Terreno Ultra-HD configurado");
    } catch (error) {
        console.warn("⚠️ Error al cargar terreno Ultra-HD:", error);
    }
};

/**
 * Implementar efectos de agua realistas
 */
export const setupRealisticWaterEffects = (viewer: unknown, Cesium: unknown): void => {
    try {
        const scene = (viewer as any).scene;
        const globe = scene.globe;
        
        // Efectos de agua avanzados
        if (globe.showWaterEffect !== undefined) {
            globe.showWaterEffect = true;
        }
        
        globe.enableLighting = true;
        
        // Configuración básica de agua sin materiales complejos por ahora
        if (globe.oceanNormalMapUrl !== undefined) {
            globe.oceanNormalMapUrl = 'https://cesium.com/downloads/cesiumjs/releases/1.134/Build/Cesium/Assets/Textures/waterNormals.jpg';
        }
        
        console.log("🌊 Efectos de agua realistas configurados");
    } catch (error) {
        console.warn("⚠️ Error configurando efectos de agua:", error);
    }
};

/**
 * Sistema de partículas para efectos climáticos
 */
export const setupParticleWeatherSystem = (viewer: unknown, Cesium: unknown): void => {
    try {
        console.log("☁️ Sistema de partículas preparado (modo simplificado)");
        // Sistema simplificado para evitar problemas de duplicación
        // Los efectos de partículas se activarán mediante controles
    } catch (error) {
        console.warn("⚠️ Error configurando sistema de partículas:", error);
    }
};

/**
 * Verificar si un post-processing stage ya existe
 */
const hasPostProcessStage = (collection: any, stageName: string): boolean => {
    if (!collection || !collection.length) return false;
    
    for (let i = 0; i < collection.length; i++) {
        const stage = collection.get(i);
        if (stage && stage.name === stageName) {
            return true;
        }
    }
    return false;
};

/**
 * Configuración de iluminación cinematográfica segura
 */
export const setupCinematicLighting = (viewer: unknown, Cesium: unknown): void => {
    try {
        const scene = (viewer as any).scene;
        
        // Configuración de iluminación avanzada
        if ((Cesium as any).DirectionalLight && (Cesium as any).Cartesian3) {
            scene.light = new (Cesium as any).DirectionalLight({
                direction: new (Cesium as any).Cartesian3(0.5, -0.8, -0.2)
            });
        }
        
        // Post-processing effects con verificación de duplicados
        if (scene.postProcessStages && (Cesium as any).PostProcessStageLibrary) {
            // Bloom effect - verificar antes de agregar
            if (!hasPostProcessStage(scene.postProcessStages, 'czm_bloom')) {
                try {
                    const bloom = scene.postProcessStages.add((Cesium as any).PostProcessStageLibrary.createBloomStage());
                    if (bloom && bloom.uniforms) {
                        bloom.uniforms.contrast = 64;  // Valores más conservadores
                        bloom.uniforms.brightness = -0.1;
                        bloom.uniforms.glowOnly = false;
                        bloom.uniforms.delta = 1.0;
                        bloom.uniforms.sigma = 2.0;
                        bloom.uniforms.stepSize = 3.0;
                        bloom.enabled = true;
                    }
                    console.log("✨ Efecto Bloom configurado");
                } catch (bloomError) {
                    console.warn("⚠️ Error configurando Bloom:", bloomError);
                }
            } else {
                console.log("✨ Bloom ya existe, saltando configuración");
            }
            
            // Ambient occlusion - verificar antes de agregar
            if (!hasPostProcessStage(scene.postProcessStages, 'czm_ao')) {
                try {
                    const ao = scene.postProcessStages.add((Cesium as any).PostProcessStageLibrary.createAmbientOcclusionStage());
                    if (ao && ao.uniforms) {
                        ao.uniforms.intensity = 2.0;  // Valores más suaves
                        ao.uniforms.bias = 0.05;
                        ao.uniforms.lengthCap = 0.13;
                        ao.uniforms.stepSize = 1.0;
                        ao.uniforms.frustumLength = 300.0;
                        ao.enabled = true;
                    }
                    console.log("🌫️ Ambient Occlusion configurado");
                } catch (aoError) {
                    console.warn("⚠️ Error configurando Ambient Occlusion:", aoError);
                }
            } else {
                console.log("🌫️ Ambient Occlusion ya existe, saltando configuración");
            }
        }
        
        console.log("🎬 Iluminación cinematográfica configurada");
    } catch (error) {
        console.warn("⚠️ Error en configuración cinematográfica:", error);
    }
};

/**
 * Configurar entrada cinematográfica con animaciones
 */
export const setupCinematicEntrance = async (viewer: unknown, Cesium: unknown): Promise<void> => {
    try {
        const camera = (viewer as any).camera;
        const scene = (viewer as any).scene;
        
        console.log("🎬 Centrando globo automáticamente...");
        
        // Posición final optimizada: Perfectamente centrada
        const optimalPosition = (Cesium as any).Cartesian3.fromDegrees(0.0, 0.0, 12000000);
        
        // Configurar cámara directamente en posición óptima
        camera.setView({
            destination: optimalPosition,
            orientation: {
                heading: (Cesium as any).Math.toRadians(0.0),
                pitch: (Cesium as any).Math.toRadians(-45.0), // Ángulo óptimo inmediato
                roll: 0.0
            }
        });
        
        // Breve animación suave de ajuste final para mejor UX
        setTimeout(async () => {
            await camera.flyTo({
                destination: optimalPosition,
                orientation: {
                    heading: (Cesium as any).Math.toRadians(0.0),
                    pitch: (Cesium as any).Math.toRadians(-40.0), // Ajuste fino del ángulo
                    roll: 0.0
                },
                duration: 1.0, // Muy rápido, solo refinamiento
                easingFunction: (Cesium as any).EasingFunction.CUBIC_OUT,
                complete: () => {
                    console.log("✅ Globo perfectamente centrado y listo");
                    
                    // Iniciar rotación suave del globo
                    setupGlobeRotationAnimation(viewer, Cesium);
                }
            });
        }, 200);
        
        // Efectos adicionales durante la animación
        setTimeout(() => {
            if (scene.postProcessStages) {
                // Fade in gradual de los efectos
                scene.postProcessStages.fxaa.enabled = true;
            }
        }, 1000);
        
    } catch (error) {
        console.warn("⚠️ Error en entrada cinematográfica:", error);
    }
};

/**
 * Configurar animación continua de rotación del globo
 */
export const setupGlobeRotationAnimation = (viewer: unknown, Cesium: unknown): void => {
    try {
        const scene = (viewer as any).scene;
        const camera = (viewer as any).camera;
        
        // Configurar rotación automática suave
        scene.preUpdate.addEventListener(() => {
            if (!scene.cameraUnderground && !scene.mode === (Cesium as any).SceneMode.MORPHING) {
                // Rotación muy suave alrededor del eje Y
                camera.rotate((Cesium as any).Cartesian3.UNIT_Z, 0.0002);
            }
        });
        
        console.log("🔄 Rotación automática del globo activada");
    } catch (error) {
        console.warn("⚠️ Error configurando rotación:", error);
    }
};

/**
 * Animaciones de hover mejoradas para las ciudades
 */
export const setupCityHoverAnimations = (viewer: unknown, Cesium: unknown): void => {
    try {
        const handler = new (Cesium as any).ScreenSpaceEventHandler((viewer as any).scene.canvas);
        
        // Efecto hover en ciudades
        handler.setInputAction((event: any) => {
            const pickedObject = (viewer as any).scene.pick(event.endPosition);
            
            if (pickedObject && pickedObject.id && pickedObject.id.point) {
                // Aumentar tamaño suavemente
                pickedObject.id.point.pixelSize = 25;
                pickedObject.id.point.color = (Cesium as any).Color.YELLOW.withAlpha(0.9);
                
                // Cambiar cursor
                document.body.style.cursor = 'pointer';
            } else {
                // Restaurar ciudades
                (viewer as any).entities.values.forEach((entity: any) => {
                    if (entity.point) {
                        entity.point.pixelSize = 20;
                    }
                });
                document.body.style.cursor = 'default';
            }
        }, (Cesium as any).ScreenSpaceEventType.MOUSE_MOVE);
        
        console.log("🏙️ Animaciones de hover activadas");
    } catch (error) {
        console.warn("⚠️ Error configurando hover:", error);
    }
};
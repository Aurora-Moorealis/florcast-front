/**
 * Utilidades para CesiumJS
 * Funciones helper y configuraciones comunes
 */

import type { CesiumViewerConstructorOptions, City } from '../types/cesium.types';
import type { Flower } from '../types/flowers';

/**
 * Configuración CDN de Cesium
 */
export const CESIUM_CDN_URL = "https://cesium.com/downloads/cesiumjs/releases/1.134/Build/Cesium/";

/**
 * Verificar compatibilidad del navegador antes de inicializar Cesium
 */
export const checkBrowserCompatibility = (): { compatible: boolean; issues: string[] } => {
    const issues: string[] = [];
    
    // Verificar WebAssembly
    if (typeof WebAssembly === 'undefined') {
        issues.push('WebAssembly no disponible');
    }
    
    // Verificar WebGL
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
        issues.push('WebGL no disponible');
    }
    
    // Verificar memoria (si está disponible)
    if ((performance as any).memory) {
        const memInfo = (performance as any).memory;
        const availableMemory = memInfo.jsHeapSizeLimit - memInfo.usedJSHeapSize;
        if (availableMemory < 100 * 1024 * 1024) { // Menos de 100MB
            issues.push('Memoria insuficiente disponible');
        }
    }
    
    // Verificar características del navegador
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
        const match = userAgent.match(/chrome\/(\d+)/);
        if (match && parseInt(match[1]) < 89) {
            issues.push('Chrome desactualizado (se requiere v89+)');
        }
    } else if (userAgent.includes('firefox')) {
        const match = userAgent.match(/firefox\/(\d+)/);
        if (match && parseInt(match[1]) < 88) {
            issues.push('Firefox desactualizado (se requiere v88+)');
        }
    }
    
    return {
        compatible: issues.length === 0,
        issues
    };
};

/**
 * Configurar la URL base de Cesium
 */
export const configureCesiumBase = (): void => {
    window.CESIUM_BASE_URL = CESIUM_CDN_URL;
};

/**
 * Configuración del viewer optimizada para memoria
 */
export const getAdvancedViewerConfig = (): CesiumViewerConstructorOptions => ({
    animation: false,
    baseLayerPicker: false,  // Desactivado para ahorrar memoria
    fullscreenButton: true,
    geocoder: false,
    homeButton: false,  // Desactivado - usando controles personalizados
    infoBox: false,  // Desactivado para ahorrar memoria
    sceneModePicker: false,
    selectionIndicator: false,  // Desactivado para ahorrar memoria
    timeline: false,
    navigationHelpButton: false,  // Desactivado para ahorrar memoria
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
 * Mapeo de nombres comunes a colores Cesium para flores
 */
const getFlowerColor = (commonName: string, Cesium: any): any => {
    const colorMap: Record<string, any> = {
        'rose': Cesium.Color.HOTPINK,
        'rosa': Cesium.Color.HOTPINK,
        'red': Cesium.Color.RED,
        'roja': Cesium.Color.RED,
        'white': Cesium.Color.WHITE,
        'blanca': Cesium.Color.WHITE,
        'yellow': Cesium.Color.YELLOW,
        'amarilla': Cesium.Color.YELLOW,
        'sunflower': Cesium.Color.GOLD,
        'blue': Cesium.Color.BLUE,
        'azul': Cesium.Color.BLUE,
        'violet': Cesium.Color.VIOLET,
        'purple': Cesium.Color.PURPLE,
        'violeta': Cesium.Color.VIOLET,
        'green': Cesium.Color.GREEN,
        'verde': Cesium.Color.GREEN,
        'orange': Cesium.Color.ORANGE,
        'naranja': Cesium.Color.ORANGE,
        'pink': Cesium.Color.PINK,
        'fucsia': Cesium.Color.FUCHSIA,
        'coral': Cesium.Color.CORAL,
        'lavender': Cesium.Color.LAVENDER
    };

    const lowerName = commonName.toLowerCase();
    const colorKey = Object.keys(colorMap).find(key => 
        lowerName.includes(key)
    );
    
    return colorKey ? colorMap[colorKey] : Cesium.Color.LIGHTGREEN; // Color por defecto
};

/**
 * Determinar rareza basada en familia, altura y características especiales
 */
const determineFlowerRarity = (flower: Flower): string => {
    const rareFamilies = ['Orchidaceae', 'Strelitziaceae', 'Theaceae'];
    const commonFamilies = ['Asteraceae', 'Fabaceae'];
    const isHighMountain = flower.description.toLowerCase().includes('mountain') || 
                          flower.description.toLowerCase().includes('alpine') ||
                          flower.location_name.toLowerCase().includes('everest') ||
                          flower.location_name.toLowerCase().includes('swiss');
    
    // Legendaria: Orquídeas de montaña, flores extremadamente raras
    if ((rareFamilies.includes(flower.family) && isHighMountain) || 
        flower.description.toLowerCase().includes('rare') ||
        flower.description.toLowerCase().includes('toxic')) {
        return 'legendaria';
    }
    
    // Exótica: Orquídeas, flores tropicales únicas, flores de familias raras
    if (rareFamilies.includes(flower.family) || 
        flower.description.toLowerCase().includes('tropical') ||
        flower.description.toLowerCase().includes('exotic') ||
        flower.height >= 300) {
        return 'exótica';
    }
    
    // Rara: Flores medianas con características especiales
    if (flower.height >= 100 || 
        flower.description.toLowerCase().includes('fragrance') ||
        flower.description.toLowerCase().includes('ornamental')) {
        return 'rara';
    }
    
    return 'común';
};

/**
 * Limpiar todas las flores existentes del mapa
 */
export const clearFlowerMarkers = (viewer: unknown): void => {
    if (!viewer) return;
    
    const entities = (viewer as any).entities;
    const flowersToRemove: any[] = [];
    
    // Encontrar todas las entidades que son flores
    entities.values.forEach((entity: any) => {
        if (entity.id && entity.id.toString().startsWith('flower-')) {
            flowersToRemove.push(entity);
        }
    });
    
    // Remover las flores encontradas
    flowersToRemove.forEach(entity => {
        entities.remove(entity);
    });
    
    console.log(`🧹 Limpiadas ${flowersToRemove.length} flores del mapa`);
};

/**
 * Añadir marcadores de flores al mapa
 */
export const addFlowerMarkers = (viewer: unknown, Cesium: unknown, flowers: Flower[]): void => {
    if (!viewer || !flowers.length) {
        console.warn("Viewer no disponible o no hay flores para agregar");
        return;
    }
    
    // Limpiar flores existentes antes de agregar nuevas
    clearFlowerMarkers(viewer);
    
    console.log(`🌸 Agregando ${flowers.length} flores al mapa...`);
    
    flowers.forEach((flower: Flower) => {
        const flowerColor = getFlowerColor(flower.common_name, Cesium);
        const rarity = determineFlowerRarity(flower);
        
        // Tamaño del punto basado en rareza - más sutil
        const getPixelSize = (rarity: string): number => {
            switch (rarity) {
                case 'legendaria': return 12;  // Reducido de 25 a 12
                case 'exótica': return 10;     // Reducido de 22 a 10
                case 'rara': return 8;          // Reducido de 19 a 8
                default: return 6;              // Reducido de 16 a 6
            }
        };

        // Descripción enriquecida
        const description = `
            <div style="max-width: 300px;">
                <h3 style="color: #4CAF50; margin: 0 0 10px 0;">${flower.common_name}</h3>
                <p style="font-style: italic; color: #666; margin: 0 0 8px 0;">${flower.scientific_name}</p>
                <p style="margin: 0 0 8px 0;"><strong>Familia:</strong> ${flower.family}</p>
                <p style="margin: 0 0 8px 0;"><strong>Altura:</strong> ${flower.height} cm</p>
                <p style="margin: 0 0 8px 0;"><strong>Temporada:</strong> ${Array.isArray(flower.bloom_season) ? flower.bloom_season.join(', ') : flower.bloom_season}</p>
                <p style="margin: 0 0 8px 0;"><strong>Rareza:</strong> <span style="color: ${
                    rarity === 'legendaria' ? '#FFD700' :
                    rarity === 'exótica' ? '#9C27B0' :
                    rarity === 'rara' ? '#2196F3' : '#4CAF50'
                }">${rarity}</span></p>
                <p style="margin: 0 0 8px 0;">${flower.description}</p>
                <p style="margin: 0; color: #666; font-size: 0.9em;">${flower.location_name}</p>
            </div>
        `;

        const entityId = `flower-${flower.id}`;
        
        // Verificar si la entidad ya existe (doble seguridad)
        const existingEntity = (viewer as any).entities.getById(entityId);
        if (existingEntity) {
            console.warn(`⚠️ Entidad ${entityId} ya existe, saltando...`);
            return; // Saltar esta flor
        }

        try {
            (viewer as any).entities.add({
                id: entityId,
                position: (Cesium as any).Cartesian3.fromDegrees(flower.longitude, flower.latitude, 0), // Posición a nivel del suelo
                name: flower.common_name,
            description: description,
            flower: flower, // Almacenar datos de la flor para referencia
            point: {
                pixelSize: getPixelSize(rarity),
                color: flowerColor,
                outlineColor: (Cesium as any).Color.WHITE,
                outlineWidth: 2,
                heightReference: (Cesium as any).HeightReference.CLAMP_TO_GROUND,
                // Configuración para puntos sutiles que crecen con zoom
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
                // Escalado corregido: valores más razonables
                scaleByDistance: new (Cesium as any).NearFarScalar(
                    1.0e5,    // A 100km: escala grande (2.5x)
                    2.5,      // Tamaño grande cuando estás cerca
                    1.0e7,    // A 10,000km: escala normal (1x)
                    1.0       // Tamaño normal a distancia media
                ),
                // Transparencia suave: mejor transición
                translucencyByDistance: new (Cesium as any).NearFarScalar(
                    5.0e5,    // A 500km: completamente opaco
                    1.0,
                    1.5e7,    // A 15,000km: semi-transparente
                    0.4
                ),
                // Condición de distancia balanceada: visible desde zoom medio
                distanceDisplayCondition: new (Cesium as any).DistanceDisplayCondition(0.0, 1.5e7)
            },
            label: {
                text: flower.common_name,
                font: '11pt Roboto, sans-serif',
                fillColor: (Cesium as any).Color.WHITE,
                outlineColor: (Cesium as any).Color.BLACK,
                outlineWidth: 2,
                style: (Cesium as any).LabelStyle.FILL_AND_OUTLINE,
                pixelOffset: new (Cesium as any).Cartesian2(0, -40),
                // Configuración mejorada para oclusión de etiquetas
                disableDepthTestDistance: undefined, // Permitir oclusión de etiquetas también
                translucencyByDistance: new (Cesium as any).NearFarScalar(1.5e2, 1.0, 8.0e6, 0.0),
                scaleByDistance: new (Cesium as any).NearFarScalar(1.5e2, 1.2, 1.5e7, 0.0),
                distanceDisplayCondition: new (Cesium as any).DistanceDisplayCondition(0.0, 3.0e6), // Etiquetas con más zoom
                show: rarity !== 'común' // Mostrar etiquetas solo para flores especiales
            }
            });
        } catch (entityError) {
            console.error(`❌ Error agregando flor ${flower.common_name}:`, entityError);
        }
    });
};

/**
 * Configurar controles de cámara avanzados con movimientos suaves
 */
export const configureAdvancedControls = (viewer: unknown): void => {
    try {
        const controller = (viewer as any).scene?.screenSpaceCameraController;
        
        if (!controller) {
            console.warn("⚠️ Controller no disponible, saltando configuración");
            return;
        }
        
        // Distancias de zoom ajustadas para mejor experiencia con puntos
        controller.minimumZoomDistance = 100;        // Permitir más zoom cercano
        controller.maximumZoomDistance = 30000000;   // Límite más razonable
        
        // Habilitar controles
        controller.enableRotate = true;
        controller.enableTranslate = true;
        controller.enableZoom = true;
        controller.enableTilt = true;
        controller.enableLook = true;
        
        // Configuración de inercia para movimientos más suaves
        controller.inertiaSpin = 0.95;      // Aumentado para rotación más suave
        controller.inertiaTranslate = 0.95; // Aumentado para translación más suave
        controller.inertiaZoom = 0.90;      // Aumentado para zoom más suave
        
        // Configuración adicional para suavidad (con verificación de disponibilidad)
        if (controller.bounceAnimationTime !== undefined) {
            controller.bounceAnimationTime = 3.0; // Animación de rebote más larga
        }
        
        if (controller.constrainedAxis !== undefined) {
            controller.constrainedAxis = undefined; // Sin restricciones de eje
        }
        
        console.log("🎮 Controles suaves configurados");
    } catch (error) {
        console.error("❌ Error configurando controles:", error);
    }
};

/**
 * Actualizar visibilidad de puntos basado en la posición de la cámara
 */
export const updatePointVisibility = (viewer: unknown, Cesium: unknown): void => {
    try {
        if (!viewer) return;
        
        const camera = (viewer as any).camera;
        const scene = (viewer as any).scene;
        const entities = (viewer as any).entities.values;
        
        entities.forEach((entity: any) => {
            if (entity.id && entity.id.toString().startsWith('flower-') && entity.point) {
                // Obtener la posición del punto en coordenadas de pantalla
                const pointPosition = entity.position._value || entity.position;
                
                // Verificar si el punto está visible desde la cámara actual
                const occluder = new (Cesium as any).EllipsoidalOccluder(
                    (Cesium as any).Ellipsoid.WGS84,
                    camera.position
                );
                
                const isVisible = occluder.isPointVisible(pointPosition);
                
                // Mostrar/ocultar el punto basado en su visibilidad
                entity.point.show = isVisible;
                if (entity.label) {
                    entity.label.show = isVisible && (entity.flower?.rarity !== 'común');
                }
            }
        });
    } catch (error) {
        console.error("❌ Error actualizando visibilidad de puntos:", error);
    }
};

/**
 * Configurar oclusión y visibilidad de puntos
 */
export const configurePointOcclusion = (viewer: unknown, Cesium: unknown): void => {
    try {
        const scene = (viewer as any).scene;
        
        if (!scene || !scene.globe) {
            console.warn("⚠️ Scene o globe no disponible, saltando configuración de oclusión");
            return;
        }
        
        // Configuración avanzada de oclusión para ocultar puntos detrás del globo
        scene.globe.depthTestAgainstTerrain = true;
        
        // Asegurar que el globo sea completamente opaco
        if (scene.globe.translucency) {
            scene.globe.translucency.enabled = false;
        }
        
        // Configurar material del globo
        if (scene.globe.material) {
            scene.globe.material.alpha = 1.0;
        }
        
        // Configurar oclusión atmosférica
        scene.skyAtmosphere.show = true;
        
        // Desactivar completamente la iluminación para eliminar sombras
        scene.globe.enableLighting = false; // Importante: desactivar para globo uniforme
        scene.globe.dynamicAtmosphereLighting = false;
        scene.globe.dynamicAtmosphereLightingFromSun = false;
        
        // Configurar luz ambiente global uniforme
        if (scene.light) {
            scene.light.intensity = 1.0; // Intensidad normal
        }
        
        // Configurar atmósfera brillante y uniforme
        scene.skyAtmosphere.brightnessShift = 0.6; // Más brillante
        scene.skyAtmosphere.saturationShift = 0.3;  // Colores más vivos
        scene.skyAtmosphere.hueShift = 0.0;
        
        // Eliminar cualquier sombra residual
        scene.shadowMap.enabled = false;
        
        // Mejorar la precisión de la oclusión (con verificaciones)
        if (scene.logarithmicDepthBuffer !== undefined) {
            scene.logarithmicDepthBuffer = true;
        }
        
        if (scene.fxaa !== undefined) {
            scene.fxaa = true;
        }
        
        console.log("🌍 Oclusión de puntos configurada correctamente");
    } catch (error) {
        console.error("❌ Error configurando oclusión:", error);
    }
};

/**
 * Configurar eventos de interacción suaves con información
 */
export const setupSmoothInteractionEvents = (viewer: unknown, Cesium: unknown, onFlowerHover?: (flower: any) => void, onFlowerClick?: (flower: any) => void): void => {
    const handler = new (Cesium as any).ScreenSpaceEventHandler((viewer as any).scene.canvas);
    let hoveredEntity: any = null;
    
    // Evento de click - mostrar información y navegar con focus mejorado
    handler.setInputAction((event: any) => {
        // Mejorar la detección con múltiples intentos
        let pickedEntity = (viewer as any).scene.pick(event.position);
        
        // Si no se detectó, intentar con un área más grande
        if (!pickedEntity) {
            const pickedObjects = (viewer as any).scene.drillPick(event.position);
            if (pickedObjects && pickedObjects.length > 0) {
                pickedEntity = pickedObjects.find((obj: any) => 
                    obj.id && obj.id.id && obj.id.id.startsWith('flower-')
                );
            }
        }
        
        if (pickedEntity && pickedEntity.id && pickedEntity.id.id && pickedEntity.id.id.startsWith('flower-')) {
            const entity = pickedEntity.id;
            
            // Limpiar selecciones anteriores
            const entities = (viewer as any).entities.values;
            entities.forEach((ent: any) => {
                if (ent.id && ent.id.toString().startsWith('flower-') && ent.point) {
                    // Restaurar tamaño original
                    ent.point.outlineWidth = 2;
                    ent.point.outlineColor = (Cesium as any).Color.WHITE;
                }
            });
            
            // Resaltar el punto seleccionado con focus especial
            if (entity.point) {
                entity.point.outlineWidth = 6;
                entity.point.outlineColor = (Cesium as any).Color.YELLOW;
                // No modificar scaleByDistance para mantener la configuración global
            }
            
            // Navegar suavemente a la flor - método simplificado
            (viewer as any).flyTo(entity, {
                duration: 1.8, // Duración más corta para navegación más ágil
                offset: new (Cesium as any).HeadingPitchRange(
                    (Cesium as any).Math.toRadians(0),      // Sin rotación horizontal
                    (Cesium as any).Math.toRadians(-35),    // Ángulo más suave
                    1500000  // Distancia cómoda (1500km)
                )
            }).then(() => {
                // Seleccionar la entidad después de la navegación
                (viewer as any).selectedEntity = entity;
            }).catch((error: any) => {
                console.warn('Error en navegación:', error);
                (viewer as any).selectedEntity = entity;
            })
            
            // Ejecutar animación después de la navegación
            setTimeout(() => {
                // Seleccionar la entidad con focus
                (viewer as any).selectedEntity = entity;
                
                // Animación de pulsación para el focus
                if (entity.point) {
                    const originalSize = entity.point.pixelSize._value || entity.point.pixelSize;
                    let growing = true;
                    let pulseCount = 0;
                    
                    const pulseAnimation = setInterval(() => {
                        if (pulseCount >= 6) { // 3 pulsaciones completas
                            clearInterval(pulseAnimation);
                            entity.point.pixelSize = originalSize;
                            return;
                        }
                        
                        if (growing) {
                            entity.point.pixelSize = originalSize * 1.3;
                        } else {
                            entity.point.pixelSize = originalSize;
                            pulseCount++;
                        }
                        growing = !growing;
                    }, 300);
                }
            }, 2000); // Esperar a que termine la animación de navegación (1.8s + margen)
            
            // Callback para mostrar información
            if (onFlowerClick && entity.flower) {
                onFlowerClick(entity.flower);
            }
            
            console.log(`🌸 Focus en ${entity.name}`);
        } else {
            // Click en vacío - limpiar selección y focus
            const entities = (viewer as any).entities.values;
            entities.forEach((ent: any) => {
                if (ent.id && ent.id.toString().startsWith('flower-') && ent.point) {
                    ent.point.outlineWidth = 2;
                    ent.point.outlineColor = (Cesium as any).Color.WHITE;
                }
            });
            
            (viewer as any).selectedEntity = undefined;
            if (onFlowerClick) {
                onFlowerClick(null);
            }
        }
    }, (Cesium as any).ScreenSpaceEventType.LEFT_CLICK);
    
    // Evento de hover - resaltar punto
    handler.setInputAction((event: any) => {
        const pickedEntity = (viewer as any).scene.pick(event.endPosition);
        
        // Limpiar hover anterior
        if (hoveredEntity && hoveredEntity.point) {
            hoveredEntity.point.outlineWidth = 2;
            hoveredEntity.point.pixelSize *= 0.8; // Reducir tamaño
        }
        
        if (pickedEntity && pickedEntity.id && pickedEntity.id.id && pickedEntity.id.id.startsWith('flower-')) {
            const entity = pickedEntity.id;
            
            // Resaltar la entidad
            if (entity.point) {
                entity.point.outlineWidth = 4;
                entity.point.pixelSize *= 1.2; // Aumentar tamaño
            }
            
            hoveredEntity = entity;
            
            // Cambiar cursor
            (viewer as any).canvas.style.cursor = 'pointer';
            
            // Callback para mostrar preview
            if (onFlowerHover && entity.flower) {
                onFlowerHover(entity.flower);
            }
        } else {
            hoveredEntity = null;
            (viewer as any).canvas.style.cursor = 'default';
            
            if (onFlowerHover) {
                onFlowerHover(null);
            }
        }
    }, (Cesium as any).ScreenSpaceEventType.MOUSE_MOVE);
    
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
    
    let errorMessage = "Error desconocido inicializando Cesium";
    
    if (error instanceof Error) {
        errorMessage = error.message;
        console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        errorMessage = String(error);
    }
    
    // Agregar información específica para errores comunes
    if (errorMessage.includes('WebAssembly')) {
        errorMessage = `Error WebAssembly: ${errorMessage}. Intenta recargar la página o usar un navegador compatible.`;
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        errorMessage = `Error de red: ${errorMessage}. Verifica tu conexión a internet.`;
    } else if (errorMessage.includes('memory') || errorMessage.includes('out of memory')) {
        errorMessage = `Error de memoria: ${errorMessage}. Intenta cerrar otras pestañas del navegador.`;
    }
    
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
        
        // Configuración de sombras optimizada para memoria
        if (scene.shadowMap) {
            scene.shadowMap.enabled = true;
            scene.shadowMap.size = 1024;  // Resolución optimizada para memoria
            if (scene.shadowMap.softShadows !== undefined) {
                scene.shadowMap.softShadows = false;  // Desactivar sombras suaves para ahorrar memoria
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

/**
 * Navegar a una flor específica en el mapa
 */
export const flyToFlower = (viewer: unknown, Cesium: unknown, flower: Flower): void => {
    if (!viewer || !flower) {
        console.warn("Viewer o flor no disponible para navegación");
        return;
    }

    try {
        // Buscar la entidad de la flor por ID
        const entity = (viewer as any).entities.getById(`flower-${flower.id}`);
        
        if (entity) {
            // Limpiar selecciones anteriores y resaltar la flor objetivo
            const entities = (viewer as any).entities.values;
            entities.forEach((ent: any) => {
                if (ent.id && ent.id.toString().startsWith('flower-') && ent.point) {
                    ent.point.outlineWidth = 2;
                    ent.point.outlineColor = (Cesium as any).Color.WHITE;
                }
            });
            
            // Resaltar el punto seleccionado
            if (entity.point) {
                entity.point.outlineWidth = 6;
                entity.point.outlineColor = (Cesium as any).Color.YELLOW;
            }
            
            // Navegación suave consistente con el click
            (viewer as any).flyTo(entity, {
                duration: 1.8, // Misma duración que el click
                offset: new (Cesium as any).HeadingPitchRange(
                    (Cesium as any).Math.toRadians(0),      // Sin rotación horizontal
                    (Cesium as any).Math.toRadians(-35),    // Mismo ángulo que el click
                    1500000  // Misma distancia cómoda (1500km)
                )
            }).then(() => {
                // Seleccionar la entidad después de la navegación
                (viewer as any).selectedEntity = entity;
                
                // Animación de pulsación igual que con el click
                setTimeout(() => {
                    if (entity.point) {
                        const originalSize = entity.point.pixelSize._value || entity.point.pixelSize;
                        let growing = true;
                        let pulseCount = 0;
                        
                        const pulseAnimation = setInterval(() => {
                            if (pulseCount >= 6) {
                                clearInterval(pulseAnimation);
                                entity.point.pixelSize = originalSize;
                                return;
                            }
                            
                            if (growing) {
                                entity.point.pixelSize = originalSize * 1.3;
                            } else {
                                entity.point.pixelSize = originalSize;
                                pulseCount++;
                            }
                            growing = !growing;
                        }, 300);
                    }
                }, 2000);
                
                console.log(`🌸 Navegado a ${flower.common_name} desde filtro`);
            }).catch((error: any) => {
                console.warn('Error en navegación desde filtro:', error);
                (viewer as any).selectedEntity = entity;
            });
        } else {
            // Si no se encuentra la entidad, navegar directamente a las coordenadas
            (viewer as any).camera.flyTo({
                destination: (Cesium as any).Cartesian3.fromDegrees(
                    flower.longitude, 
                    flower.latitude, 
                    1500000 // Misma distancia que con entidad
                ),
                orientation: {
                    heading: (Cesium as any).Math.toRadians(0),
                    pitch: (Cesium as any).Math.toRadians(-35),
                    roll: 0.0
                },
                duration: 1.8
            });
            console.log(`🌸 Navegado a coordenadas de ${flower.common_name} desde filtro`);
        }
    } catch (error) {
        console.error("Error navegando a la flor:", error);
        
        // Fallback: navegar a las coordenadas básicas
        (viewer as any).camera.setView({
            destination: (Cesium as any).Cartesian3.fromDegrees(
                flower.longitude, 
                flower.latitude, 
                100000
            )
        });
    }
};
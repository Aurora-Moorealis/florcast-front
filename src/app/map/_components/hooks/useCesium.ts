/**
 * Hook personalizado para CesiumJS Earth Pro
 * Lóg                // Configuración básica optimizada para memoria
                configureSceneVisuals((cesiumViewer as any).scene);
                console.log("🔧 Sistema básico configurado");
                
                // Terreno básico sin ultra-HD para ahorrar memoria
                setTerrainLoaded(true); el globo 3D avanzado con 6 ciudades
 */

import { useState, useEffect, useRef } from 'react';
// Types para Cesium se manejan como any debido a la complejidad de la librería
import { 
    configureCesiumBase, 
    checkBrowserCompatibility,
    handleCesiumError,
    getAdvancedViewerConfig,
    setInitialCameraView,
    configureSceneVisuals,
    setupAdvancedTerrain,
    addFlowerMarkers,
    clearFlowerMarkers,
    flyToFlower,
    setupInteractionEvents,
    configureAdvancedControls,
    configurePointOcclusion,
    setupSmoothInteractionEvents,
    configurePerformanceOptimizations,
    updatePointVisibility
} from '../utils/cesium.utils';
import { mockFlowerData } from '../../../../data/flower';

/**
 * Hook para Cesium Earth Pro Ultra con animaciones avanzadas
 * Configuración optimizada y experiencia cinematográfica
 */
export const useCesiumAdvanced = (callbacks?: {
    onFlowerHover?: (flower: any) => void;
    onFlowerClick?: (flower: any) => void;
}) => {
    const cesiumContainerRef = useRef<HTMLDivElement | null>(null);
    const initializingRef = useRef<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [viewer, setViewer] = useState<any>(null);
    const [terrainLoaded, setTerrainLoaded] = useState<boolean>(false);

    useEffect(() => {
        let cesiumViewer: any = null;
        
        // Evitar múltiples inicializaciones simultáneas
        if (initializingRef.current) {
            console.log("⏳ Inicialización ya en progreso, saltando...");
            return;
        }

        const initializeCesium = async (): Promise<void> => {
            try {
                // Marcar como en inicialización
                initializingRef.current = true;
                console.log("🌍 Iniciando Cesium...");
                
                // Verificar compatibilidad del navegador
                const compatibility = checkBrowserCompatibility();
                if (!compatibility.compatible) {
                    const issues = compatibility.issues.join(', ');
                    throw new Error(`Navegador incompatible: ${issues}. Usa Chrome 89+, Firefox 88+, Safari 14+ o Edge 89+`);
                }
                console.log("✅ Navegador compatible");
                
                // Verificar que el contenedor existe
                if (!cesiumContainerRef.current) {
                    throw new Error("Contenedor DOM no disponible para Cesium");
                }
                console.log("✅ Contenedor DOM disponible");
                
                // Configurar Cesium antes de la importación
                configureCesiumBase();
                console.log("✅ Cesium base configurado");
                
                // Importar Cesium con timeout
                const importPromise = import("cesium") as Promise<typeof import("cesium")>;
                const timeoutPromise = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error("Timeout importando Cesium (30s)")), 30000)
                );
                
                const Cesium = await Promise.race([importPromise, timeoutPromise]) as typeof import("cesium");
                console.log("✅ Cesium importado exitosamente");
                
                // Verificar que Cesium se importó correctamente
                if (!Cesium || !Cesium.Viewer) {
                    throw new Error("Cesium no se cargó correctamente - Viewer no disponible");
                }

                console.log("🔧 Creando viewer Cesium...");
                
                // Obtener configuración del viewer
                const viewerConfig = getAdvancedViewerConfig();
                console.log("Configuración viewer:", viewerConfig);
                
                // Crear viewer con manejo de errores específico
                try {
                    cesiumViewer = new Cesium.Viewer(cesiumContainerRef.current, viewerConfig as any);
                    console.log("✅ Viewer creado exitosamente");
                } catch (viewerError) {
                    console.error("❌ Error creando viewer:", viewerError);
                    throw new Error(`Error creando Cesium Viewer: ${viewerError instanceof Error ? viewerError.message : String(viewerError)}`);
                }
                
                // Verificar que el viewer se creó correctamente
                if (!cesiumViewer || !cesiumViewer.scene) {
                    throw new Error("Viewer creado pero scene no disponible");
                }
                
                setViewer(cesiumViewer);
                console.log("✅ Viewer configurado y guardado en estado");

                // Configurar para bajo uso de memoria
                const viewerScene = (cesiumViewer as any).scene;
                viewerScene.requestRenderMode = true;  // Renderizado bajo demanda
                viewerScene.maximumRenderTimeChange = Infinity;
                viewerScene.globe.tileCacheSize = 50;  // Cache pequeño
                viewerScene.globe.maximumScreenSpaceError = 4;  // Menor calidad para ahorrar memoria
                
                // Configurar visuales básicos
                configureSceneVisuals(viewerScene);
                console.log("🎨 Visuales básicos aplicados (memoria optimizada)");

                // Configuración de calidad ultra
                const { configureUltraHighQuality, setupUltraHDTerrain, setupAdvancedAtmosphere } = await import('../utils/cesium.utils');
                
                configureUltraHighQuality(cesiumViewer, Cesium);
                await setupUltraHDTerrain(cesiumViewer, Cesium);
                setTerrainLoaded(true);
                setupAdvancedAtmosphere(cesiumViewer, Cesium);
                console.log("� Sistema ultra configurado");

                // Agregar marcadores de flores
                addFlowerMarkers(cesiumViewer, Cesium, mockFlowerData);
                console.log("� Flores cargadas");

                // Configurar oclusión de puntos
                configurePointOcclusion(cesiumViewer, Cesium);
                
                // Configurar controles suaves
                configureAdvancedControls(cesiumViewer);
                
                // Configurar eventos de interacción suaves
                setupSmoothInteractionEvents(
                    cesiumViewer, 
                    Cesium, 
                    callbacks?.onFlowerHover, 
                    callbacks?.onFlowerClick
                );
                console.log("🎮 Controles y eventos suaves configurados");

                // Configurar actualización de visibilidad en movimiento de cámara
                let visibilityUpdateTimeout: NodeJS.Timeout | null = null;
                cesiumViewer.camera.moveEnd.addEventListener(() => {
                    // Usar debounce para evitar muchas actualizaciones
                    if (visibilityUpdateTimeout) {
                        clearTimeout(visibilityUpdateTimeout);
                    }
                    visibilityUpdateTimeout = setTimeout(() => {
                        updatePointVisibility(cesiumViewer, Cesium);
                    }, 200);
                });
                
                // Actualización inicial de visibilidad
                setTimeout(() => {
                    updatePointVisibility(cesiumViewer, Cesium);
                }, 1000);
                console.log("👁️ Sistema de visibilidad dinámico configurado");

                // Configuración básica de iluminación
                viewerScene.globe.enableLighting = true;
                viewerScene.globe.atmosphereLightIntensity = 3.0;  // Reducido para ahorrar memoria
                console.log("🎬 Iluminación básica aplicada");

                // Agregar marcadores de flores
                addFlowerMarkers(cesiumViewer, Cesium, mockFlowerData);
                console.log("� Flores cargadas");
                
                // Configurar oclusión y controles suaves
                configurePointOcclusion(cesiumViewer, Cesium);
                configureAdvancedControls(cesiumViewer);
                
                // Configurar eventos de interacción suaves
                setupSmoothInteractionEvents(
                    cesiumViewer, 
                    Cesium, 
                    callbacks?.onFlowerHover, 
                    callbacks?.onFlowerClick
                );
                
                // Configuración básica de cámara
                setInitialCameraView((cesiumViewer as any).camera, Cesium, { 
                    lon: 0, lat: 0, height: 15000000 
                });
                
                console.log("🚀 Earth Pro Basic listo (optimizado memoria)");
                setIsLoading(false);

            } catch (err: unknown) {
                handleCesiumError(err, setError, setIsLoading);
            } finally {
                // Limpiar bandera de inicialización
                initializingRef.current = false;
            }
        };

        initializeCesium();

        return () => {
            try {
                if (cesiumViewer && !(cesiumViewer as any).isDestroyed()) {
                    // Limpiar post-processing stages antes de destruir
                    if (cesiumViewer.scene?.postProcessStages) {
                        cesiumViewer.scene.postProcessStages.removeAll();
                        console.log("🧹 Post-processing stages limpiados");
                    }
                    
                    // Limpiar primitivos (partículas, etc.)
                    if (cesiumViewer.scene?.primitives) {
                        cesiumViewer.scene.primitives.removeAll();
                        console.log("🧹 Primitivos limpiados");
                    }
                    
                    // Destruir el viewer
                    (cesiumViewer as any).destroy();
                    console.log("🧹 Earth Pro Ultra limpiado completamente");
                }
            } catch (err) {
                console.error("Error en cleanup:", err);
            }
        };
    }, []);

    // Función para actualizar flores sin reinicializar Cesium
    const updateFlowers = async (newFlowers: any[]) => {
        if (viewer && newFlowers) {
            try {
                const Cesium = await import("cesium");
                addFlowerMarkers(viewer, Cesium, newFlowers);
                console.log(`🔄 Flores actualizadas: ${newFlowers.length} elementos`);
            } catch (error) {
                console.error("Error actualizando flores:", error);
            }
        }
    };

    return {
        cesiumContainerRef,
        isLoading,
        error,
        viewer,
        updateFlowers,
        terrainLoaded
    };
};

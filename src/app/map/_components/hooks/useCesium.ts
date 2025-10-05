import { useState, useEffect, useRef } from 'react';
import { 
    configureCesiumBase, 
    checkBrowserCompatibility,
    handleCesiumError,
    getAdvancedViewerConfig,
    setInitialCameraView,
    configureSceneVisuals,
    addFlowerMarkers,
    configureAdvancedControls,
configurePointOcclusion,
    setupSmoothInteractionEvents,
    updatePointVisibility
} from '../utils/cesium.utils';
import { mockFlowerData } from '../../../../data/flower';

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
        

        const initializeCesium = async (): Promise<void> => {
            try {
                // Marcar como en inicialización
                initializingRef.current = true;
                
                // Verificar compatibilidad del navegador
                const compatibility = checkBrowserCompatibility();
                if (!compatibility.compatible) {
                    const issues = compatibility.issues.join(', ');
                    throw new Error(`Navegador incompatible: ${issues}. Usa Chrome 89+, Firefox 88+, Safari 14+ o Edge 89+`);
                }
                
                // Verificar que el contenedor existe
                if (!cesiumContainerRef.current) {
                    throw new Error("Contenedor DOM no disponible para Cesium");
                }
                configureCesiumBase();
                
                const importPromise = import("cesium") as Promise<typeof import("cesium")>;
                const timeoutPromise = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error("Timeout importando Cesium (30s)")), 30000)
                );
                
                const Cesium = await Promise.race([importPromise, timeoutPromise]) as typeof import("cesium");
                
                // Verificar que Cesium se importó correctamente
                if (!Cesium || !Cesium.Viewer) {
                    throw new Error("Cesium no se cargó correctamente - Viewer no disponible");
                }
                
                const viewerConfig = getAdvancedViewerConfig();
                console.log("Configuración viewer:", viewerConfig);
                
                try {
                    cesiumViewer = new Cesium.Viewer(cesiumContainerRef.current, viewerConfig as any);
                } catch (viewerError) {
                    throw new Error(`Error creando Cesium Viewer: ${viewerError instanceof Error ? viewerError.message : String(viewerError)}`);
                }

                if (!cesiumViewer || !cesiumViewer.scene) {
                    throw new Error("Viewer creado pero scene no disponible");
                }
                
                setViewer(cesiumViewer);

                const viewerScene = (cesiumViewer as any).scene;
                viewerScene.requestRenderMode = true;  
                viewerScene.maximumRenderTimeChange = Infinity;
                viewerScene.globe.tileCacheSize = 50;
                viewerScene.globe.maximumScreenSpaceError = 4;
                
                // Configurar visuales básicos
                configureSceneVisuals(viewerScene);

                const { configureUltraHighQuality, setupUltraHDTerrain, setupAdvancedAtmosphere } = await import('../utils/cesium.utils');
                
                configureUltraHighQuality(cesiumViewer, Cesium);
                await setupUltraHDTerrain(cesiumViewer, Cesium);
                setTerrainLoaded(true);
                setupAdvancedAtmosphere(cesiumViewer, Cesium);
                
                addFlowerMarkers(cesiumViewer, Cesium, mockFlowerData);
                configurePointOcclusion(cesiumViewer);
                
                configureAdvancedControls(cesiumViewer);
                
                setupSmoothInteractionEvents(
                    cesiumViewer, 
                    Cesium, 
                    callbacks?.onFlowerHover, 
                    callbacks?.onFlowerClick
                );

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

                // Configuración básica de iluminación
                viewerScene.globe.enableLighting = true;
                viewerScene.globe.atmosphereLightIntensity = 3.0;  // Reducido para ahorrar memoria

                addFlowerMarkers(cesiumViewer, Cesium, mockFlowerData);

                configurePointOcclusion(cesiumViewer);
                configureAdvancedControls(cesiumViewer);
                
                // Configurar eventos de interacción suaves
                setupSmoothInteractionEvents(
                    cesiumViewer, 
                    Cesium, 
                    callbacks?.onFlowerHover, 
                    callbacks?.onFlowerClick
                );
                
                // Configuración básica de cámara (vista inicial)
                setInitialCameraView((cesiumViewer as any).camera, Cesium, { 
                    lon: 0, lat: 0, height: 15000000 
                });
                
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
                    }
                    
                    // Limpiar primitivos (partículas, etc.)
                    if (cesiumViewer.scene?.primitives) {
                        cesiumViewer.scene.primitives.removeAll();
                    }
                    
                    // Destruir el viewer
                    (cesiumViewer as any).destroy();
                }
            } catch (err) {
                console.error("Error en cleanup:", err);
            }
        };
    }, [callbacks?.onFlowerClick, callbacks?.onFlowerHover]);

    // Función para actualizar flores sin reinicializar Cesium
    const updateFlowers = async (newFlowers: any[]) => {
        if (viewer && newFlowers) {
            try {
                const Cesium = await import("cesium");
                addFlowerMarkers(viewer, Cesium, newFlowers);
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

import { useState, useEffect, useRef } from 'react';
import {
    configureCesiumBase,
    configureCesiumIonAccess,
    createRealisticBaseLayer,
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
        let isDisposed = false;


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

                if (isDisposed) {
                    return;
                }

                // Verificar que Cesium se importó correctamente
                if (!Cesium || !Cesium.Viewer) {
                    throw new Error("Cesium no se cargó correctamente - Viewer no disponible");
                }

                // Configurar token de Cesium Ion solo si está definido en entorno.
                // Sin token, evitamos depender de recursos de Ion para prevenir errores 401.
                configureCesiumIonAccess(Cesium);

                const viewerConfig = {
                    ...getAdvancedViewerConfig(),
                    // En Viewer (con baseLayerPicker=false), la capa base debe entrar por baseLayer.
                    baseLayer: createRealisticBaseLayer(Cesium)
                };
                console.log("Configuración viewer:", viewerConfig);

                try {
                    cesiumViewer = new Cesium.Viewer(cesiumContainerRef.current, viewerConfig as any);
                } catch (viewerError) {
                    throw new Error(`Error creando Cesium Viewer: ${viewerError instanceof Error ? viewerError.message : String(viewerError)}`);
                }

                if (isDisposed) {
                    if (cesiumViewer && !(cesiumViewer as any).isDestroyed()) {
                        (cesiumViewer as any).destroy();
                    }
                    return;
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

                if (isDisposed) {
                    return;
                }

                configureUltraHighQuality(cesiumViewer, Cesium);
                const ultraTerrainLoaded = await setupUltraHDTerrain(cesiumViewer, Cesium);
                setTerrainLoaded(ultraTerrainLoaded);
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

                // Configuración básica de cámara (vista inicial)
                setInitialCameraView((cesiumViewer as any).camera, Cesium, {
                    lon: 0, lat: 0, height: 15000000
                });

                if (!isDisposed) {
                    setIsLoading(false);
                }

            } catch (err: unknown) {
                if (!isDisposed) {
                    handleCesiumError(err, setError, setIsLoading);
                }
            } finally {
                // Limpiar bandera de inicialización
                initializingRef.current = false;
            }
        };

        initializeCesium();

        return () => {
            isDisposed = true;

            try {
                if (cesiumViewer && !(cesiumViewer as any).isDestroyed()) {
                    // Restablecer callback interno para evitar race condition al destruir
                    // Viewer (evita TypeError sobre canAnimate durante el render loop).
                    const internalWidget = (cesiumViewer as any).cesiumWidget;
                    if (internalWidget) {
                        internalWidget._canAnimateUpdateCallback = () => { };
                        if ('useDefaultRenderLoop' in internalWidget) {
                            internalWidget.useDefaultRenderLoop = false;
                        }
                    }

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

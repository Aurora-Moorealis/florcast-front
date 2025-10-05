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
    handleCesiumError,
    getAdvancedViewerConfig,
    setInitialCameraView,
    configureSceneVisuals,
    setupAdvancedTerrain,
    addCityMarkers,
    setupInteractionEvents,
    configureAdvancedControls,
    configurePerformanceOptimizations
} from '../utils/cesium.utils';

/**
 * Hook para Cesium Earth Pro Ultra con animaciones avanzadas
 * Configuración optimizada y experiencia cinematográfica
 */
export const useCesiumAdvanced = () => {
    const cesiumContainerRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [viewer, setViewer] = useState<any>(null);
    const [terrainLoaded, setTerrainLoaded] = useState<boolean>(false);

    useEffect(() => {
        let cesiumViewer: any = null;

        const initializeCesium = async (): Promise<void> => {
            try {
                console.log("🌍 Iniciando Earth Pro Ultra...");
                
                const Cesium = await import("cesium") as typeof import("cesium");
                configureCesiumBase();
                
                if (!cesiumContainerRef.current) {
                    throw new Error("Contenedor no disponible");
                }

                // Crear viewer con configuración premium
                cesiumViewer = new Cesium.Viewer(
                    cesiumContainerRef.current, 
                    getAdvancedViewerConfig() as any
                );
                
                setViewer(cesiumViewer);
                console.log("✅ Viewer Basic creado");

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

                // Agregar ciudades interactivas
                await addCityMarkers(cesiumViewer, Cesium);
                console.log("🏙️ Ciudades cargadas");

                // Configurar controles y eventos mejorados
                setupInteractionEvents(cesiumViewer, Cesium);
                configureAdvancedControls(cesiumViewer);
                
                const { setupCityHoverAnimations } = await import('../utils/cesium.utils');
                setupCityHoverAnimations(cesiumViewer, Cesium);
                console.log("🎮 Controles y animaciones listos");

                // Configuración básica de iluminación
                viewerScene.globe.enableLighting = true;
                viewerScene.globe.atmosphereLightIntensity = 3.0;  // Reducido para ahorrar memoria
                console.log("🎬 Iluminación básica aplicada");

                // Agregar ciudades básicas
                await addCityMarkers(cesiumViewer, Cesium);
                console.log("🏙️ Ciudades cargadas");
                
                // Configurar controles básicos
                setupInteractionEvents(cesiumViewer, Cesium);
                configureAdvancedControls(cesiumViewer);
                
                // Configuración básica de cámara
                setInitialCameraView((cesiumViewer as any).camera, Cesium, { 
                    lon: 0, lat: 0, height: 15000000 
                });
                
                console.log("🚀 Earth Pro Basic listo (optimizado memoria)");
                setIsLoading(false);

            } catch (err: unknown) {
                handleCesiumError(err, setError, setIsLoading);
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

    return {
        cesiumContainerRef,
        isLoading,
        error,
        viewer,
        terrainLoaded
    };
};

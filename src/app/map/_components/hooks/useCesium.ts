/**
 * Hook personalizado para CesiumJS Earth Pro
 * Lógica para el globo 3D avanzado con 6 ciudades
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
                console.log("✅ Viewer Ultra creado");

                // Configurar visuales mejorados
                configureSceneVisuals((cesiumViewer as any).scene);
                console.log("🎨 Visuales diurnos aplicados");

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

                // Efectos cinematográficos
                const { setupRealisticWaterEffects, setupParticleWeatherSystem, setupCinematicLighting } = await import('../utils/cesium.utils');
                
                setupRealisticWaterEffects(cesiumViewer, Cesium);
                setupParticleWeatherSystem(cesiumViewer, Cesium);
                setupCinematicLighting(cesiumViewer, Cesium);
                console.log("🎬 Efectos cinematográficos aplicados");

                // Optimizaciones finales
                configurePerformanceOptimizations(cesiumViewer);
                
                // Centrado automático optimizado al cargar
                const { setupCinematicEntrance } = await import('../utils/cesium.utils');
                await setupCinematicEntrance(cesiumViewer, Cesium);
                
                console.log("🚀 Earth Pro Ultra listo");
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

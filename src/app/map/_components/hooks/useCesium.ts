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
 * Hook para inicialización avanzada de Cesium Earth Pro
 * Incluye 6 ciudades interactivas y configuración completa
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
                console.log("🌍 Iniciando Cesium Earth Pro...");
                
                const Cesium = await import("cesium") as typeof import("cesium");
                configureCesiumBase();
                
                if (!cesiumContainerRef.current) {
                    throw new Error("Contenedor DOM no disponible para Earth Pro");
                }

                // Crear viewer con configuración avanzada
                cesiumViewer = new Cesium.Viewer(
                    cesiumContainerRef.current, 
                    getAdvancedViewerConfig() as any
                );
                
                setViewer(cesiumViewer);
                console.log("✅ Viewer Earth Pro creado");

                // Configurar visuales de la escena
                if (cesiumViewer) {
                    configureSceneVisuals((cesiumViewer as any).scene);
                    console.log("🎨 Visuales configurados");
                }

                // Configurar terreno avanzado
                if (cesiumViewer) {
                    await setupAdvancedTerrain(cesiumViewer, Cesium);
                    setTerrainLoaded(true);
                    console.log("🏔️ Terreno HD cargado");
                }

                // Agregar marcadores de ciudades
                if (cesiumViewer) {
                    await addCityMarkers(cesiumViewer, Cesium);
                    console.log("🏙️ 6 ciudades añadidas");
                }

                // Configurar vista inicial
                if (cesiumViewer) {
                    setInitialCameraView((cesiumViewer as any).camera, Cesium, { 
                        lon: -73.98, lat: 40.75, height: 2000000 
                    });
                }

                // Configurar eventos e interacciones
                if (cesiumViewer) {
                    setupInteractionEvents(cesiumViewer, Cesium);
                    console.log("🖱️ Eventos configurados");
                }

                // Configurar controles avanzados
                if (cesiumViewer) {
                    configureAdvancedControls(cesiumViewer);
                    console.log("⚙️ Controles avanzados activos");
                }

                // Optimizaciones de rendimiento
                if (cesiumViewer) {
                    configurePerformanceOptimizations(cesiumViewer);
                    console.log("⚡ Optimizaciones aplicadas");
                }

                console.log("🚀 Earth Pro inicializado completamente");
                setIsLoading(false);

            } catch (err: unknown) {
                handleCesiumError(err, setError, setIsLoading);
            }
        };

        initializeCesium();

        return () => {
            try {
                if (cesiumViewer && !(cesiumViewer as any).isDestroyed()) {
                    (cesiumViewer as any).destroy();
                    console.log("🧹 Earth Pro limpiado");
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

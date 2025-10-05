"use client";

import { useState, useCallback, useEffect } from "react";
import { useCesiumAdvanced } from "./hooks/useCesium";
import { ErrorDisplay, LoadingOverlay, FlowerInfoPanel, NavigationControls } from "./ui/GlobeUI";
import FlowerFilterPanel from "./ui/FlowerFilterPanel";
import { Flower } from "./types/flowers";
import { FlowerFilter } from "./types/interfaces";

/**
 * Componente Avanzado del Globo 3D con CesiumJS
 * Con movimientos suaves, oclusión de puntos e información interactiva
 */
const MapGlobe = () => {
    const [flowers] = useState<Flower[]>([]);
    const [selectedFlower, setSelectedFlower] = useState<any>(null);
    const [hoveredFlower, setHoveredFlower] = useState<any>(null);
    const [, setCurrentFilters] = useState<FlowerFilter>({});

    // Callbacks para eventos de interacción con flores
    const handleFlowerHover = useCallback((flower: any) => {
        setHoveredFlower(flower);
    }, []);

    const handleFlowerClickFromMap = useCallback((flower: any) => {
        setSelectedFlower(flower);
        setHoveredFlower(null); // Limpiar hover al hacer click
    }, []);

    // Hook de Cesium con callbacks configurados
    const { cesiumContainerRef, isLoading, error, viewer } = useCesiumAdvanced({
        onFlowerHover: handleFlowerHover,
        onFlowerClick: handleFlowerClickFromMap
    });

    // Callback para centrar la vista (misma función que usa el botón)
    const handleCenterView = useCallback(async () => {
        if (viewer) {
            try {
                const Cesium = await import('cesium');
                // Centrar en la vista global inicial
                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(0.0, 20.0, 12000000),
                    orientation: {
                        heading: Cesium.Math.toRadians(0.0),
                        pitch: Cesium.Math.toRadians(-90.0),
                        roll: 0.0
                    },
                    duration: 3.0
                });
                console.log('🎯 Vista centrada automáticamente');
            } catch (error) {
                console.error('Error centrando vista:', error);
            }
        }
    }, [viewer]);

    // Callback para cuando se selecciona una flor
    const handleFlowerSelect = useCallback((flower: any) => {
        setSelectedFlower(flower);
        console.log('Flor seleccionada:', flower);
        
        // Navegar automáticamente al punto de la flor en el mapa
        if (viewer && flower) {
            // Importar dinámicamente la función flyToFlower
            import('./utils/cesium.utils').then(({ flyToFlower }) => {
                import('cesium').then((Cesium) => {
                    flyToFlower(viewer, Cesium, flower);
                });
            });
        }
    }, [viewer]);

    // Callback para cuando cambian los filtros
    const handleFiltersChange = useCallback((filters: FlowerFilter) => {
        setCurrentFilters(filters);
        console.log('Filtros actualizados:', filters);
        // Aquí puedes agregar lógica para filtrar flores en el mapa
    }, []);

    // Ejecutar centrado automático cuando el viewer esté listo
    useEffect(() => {
        if (viewer && !isLoading) {
            console.log('🚀 Preparando centrado automático del globo...');
            // Ejecutar la misma función del botón después de un breve delay
            const timer = setTimeout(() => {
                console.log('⚡ Ejecutando centrado automático (misma función que el botón)');
                handleCenterView();
            }, 2000); // 2 segundos después de que termine la carga
            
            return () => clearTimeout(timer);
        }
    }, [viewer, isLoading, handleCenterView]);

    if (error) {
        return <ErrorDisplay error={error} title="Error MapGlobe Advanced" />;
    }

    return (
        <div className="w-full h-screen relative">
            {isLoading && (
                <LoadingOverlay 
                    title="FLORCAST Globe"
                    subtitle="Optimizado para memoria - Inicializando..."
                    color="green"
                />
            )}

            {/* Panel lateral izquierdo - Filtro de flores */}
            <FlowerFilterPanel 
                className="absolute left-0 top-0"
                flowers={flowers}
                onFlowerSelect={handleFlowerSelect}
                onFiltersChange={handleFiltersChange}
                isLoading={isLoading}
            />

            {/* Controles de navegación */}
            <NavigationControls 
                onCenterView={handleCenterView}
            />

            {/* Panel de información de flor seleccionada/enfocada */}
            <FlowerInfoPanel
                flower={selectedFlower || hoveredFlower}
                isVisible={!!(selectedFlower || hoveredFlower)}
            />

            <div
                ref={cesiumContainerRef}
                className="w-full h-full"
                style={{ 
                    backgroundColor: '#fff',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            />
        </div>
    );
};

export default MapGlobe;

"use client";

import { FC } from "react";
import { useCesiumAdvanced } from "./hooks/useCesium";
import { ErrorDisplay, LoadingOverlay, GlobeHeader, InfoPanel, SpecialEffectsControls } from "./ui/GlobeUI";
import FlowerFilterPanel from "./ui/FlowerFilterPanel";
/**
 * Componente Avanzado del Globo 3D con CesiumJS
 * Incluye 6 ciudades interactivas y configuración completa
 */
const MapGlobe: FC = () => {
    const { cesiumContainerRef, isLoading, error } = useCesiumAdvanced();

    if (error) {
        return <ErrorDisplay error={error} title="Error MapGlobe Advanced" />;
    }

    return (
        <div className="w-full h-screen relative">
            {isLoading && (
                <LoadingOverlay 
                    title="FLORCAST Globe"
                    subtitle="Inicializando globo..."
                    color="green"
                />
            )}

            {/* Panel lateral izquierdo - Filtro de rosas */}
            <FlowerFilterPanel className="absolute left-0 top-0" />


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

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
                    subtitle="Optimizado para memoria - Inicializando..."
                    color="green"
                />
            )}

            {/* Panel lateral izquierdo - Filtro de rosas */}
            <FlowerFilterPanel className="absolute left-0 top-0" />

            {/* Panel de información optimizada */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-green-400/50">
                <div className="text-center">
                    <div className="text-green-400 font-bold text-sm mb-1">🌍 FLORCAST Globe</div>
                    <div className="text-xs text-gray-300">Modo Optimizado Memoria</div>
                    <div className="text-xs text-green-300 mt-1">✅ WebAssembly Reducido</div>
                </div>
            </div>

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

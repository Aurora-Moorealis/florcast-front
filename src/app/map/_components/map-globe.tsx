"use client";

import { FC } from "react";
import { useCesiumAdvanced } from "./hooks/useCesium";
import { ErrorDisplay, LoadingOverlay, GlobeHeader, InfoPanel, PanelRight } from "./ui/GlobeUI";
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
            <GlobeHeader 
                title="FLORCAST Globe"
                subtitle={isLoading ? "Cargando globo" : "Dsc"}
                icon="🌍"
                isLoading={isLoading}
                color="purple"
            />

            {isLoading && (
                <LoadingOverlay 
                    title="FLORCAST Globe"
                    subtitle="Inicializando globo..."
                    color="green"
                />
            )}

            <PanelRight
                 
            
            />

            <InfoPanel 
                items={[
                    { label: "Ciudades", value: "6", color: "text-purple-400" },
                    { label: "Terreno", value: "HD", color: "text-green-400" },
                    { label: "Estado", value: "Activo", color: "text-blue-400" }
                ]}
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

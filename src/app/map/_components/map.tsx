"use client";

import { useState, FC } from "react";
import Globe from "./globe";
import SimpleGlobe from "./map-globe";

// Tipos para el componente Map
interface MapProps {
    defaultView?: "simple" | "advanced";
}

type ViewMode = "simple" | "advanced";

/**
 * Componente Map - Selector de vistas de globo terrestre
 * 
 * Permite alternar entre dos implementaciones de globo 3D:
 * - Simple: Implementación básica con funcionalidades esenciales
 * - Avanzado: Implementación completa con todas las características
 */
const Map: FC<MapProps> = ({ defaultView = "advanced" }) => {
    // Estado para controlar qué vista mostrar
    const [currentView, setCurrentView] = useState<ViewMode>(defaultView);

    /**
     * Alternar entre vista simple y avanzada
     */
    const toggleView = (): void => {
        setCurrentView(prev => prev === "simple" ? "advanced" : "simple");
    };

    return (
        <div className="relative w-full h-screen">
            {/* Botón de alternancia de vista */}
            <div className="absolute top-4 right-4 z-50">
                <button
                    onClick={toggleView}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center space-x-2"
                    type="button"
                >
                    <span>
                        {currentView === "simple" ? "🌍 Avanzado" : "🗺️ Simple"}
                    </span>
                </button>
            </div>

            {/* Renderizado condicional del componente de globo */}
            {currentView === "simple" ? (
                <Globe />
            ) : (
                <SimpleGlobe />
            )}
        </div>
    );
};

export default Map;
